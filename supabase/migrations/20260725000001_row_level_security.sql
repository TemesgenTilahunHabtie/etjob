-- ETJob Supabase Production Database Security Migration
-- Migration ID: 20260725000001_row_level_security.sql
-- Description: Enables Row Level Security (RLS) and defines production security policies for all 14 tables.

-- -----------------------------------------------------------------------------
-- 1. Enable RLS on All 14 Tables
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_preferences ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.telegram_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 2. Helper Security Function for Team Access
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_company_member(_user_id UUID, _company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.companies c WHERE c.id = _company_id AND c.owner_id = _user_id
    ) OR EXISTS (
        SELECT 1 FROM public.company_members cm WHERE cm.company_id = _company_id AND cm.user_id = _user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 3. Profiles Security Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Profiles are viewable by authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 4. Candidate Profiles, Skills & Preferences Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Candidate profiles viewable by authenticated users"
    ON public.candidate_profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Job seekers can manage their own candidate profile"
    ON public.candidate_profiles FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Master Skills Table (Read-only for public, insert by authenticated)
CREATE POLICY "Skills are viewable by everyone"
    ON public.skills FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Authenticated users can add new skills"
    ON public.skills FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Candidate Skills
CREATE POLICY "Candidate skills viewable by authenticated users"
    ON public.candidate_skills FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Candidates can manage their own skills"
    ON public.candidate_skills FOR ALL
    TO authenticated
    USING (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

-- Job Preferences
CREATE POLICY "Candidates can view their own job preferences"
    ON public.job_preferences FOR SELECT
    TO authenticated
    USING (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Candidates can manage their own job preferences"
    ON public.job_preferences FOR ALL
    TO authenticated
    USING (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

-- -----------------------------------------------------------------------------
-- 5. Employer & Company Security Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Company profiles viewable by everyone"
    ON public.companies FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Employers can manage companies they own"
    ON public.companies FOR ALL
    TO authenticated
    USING (owner_id = auth.uid())
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Company members viewable by team members"
    ON public.company_members FOR SELECT
    TO authenticated
    USING (
        public.is_company_member(auth.uid(), company_id)
    );

CREATE POLICY "Company owners can manage company members"
    ON public.company_members FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.companies c
            WHERE c.id = company_members.company_id AND c.owner_id = auth.uid()
        )
    );

-- -----------------------------------------------------------------------------
-- 6. Job Marketplace Security Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Categories viewable by everyone"
    ON public.job_categories FOR SELECT
    TO public
    USING (true);

-- Jobs Policies
CREATE POLICY "Public users can view active jobs"
    ON public.jobs FOR SELECT
    TO public
    USING (status = 'active');

CREATE POLICY "Employers can view all jobs for their company"
    ON public.jobs FOR SELECT
    TO authenticated
    USING (
        public.is_company_member(auth.uid(), company_id)
    );

CREATE POLICY "Employers can create jobs for their company"
    ON public.jobs FOR INSERT
    TO authenticated
    WITH CHECK (
        public.is_company_member(auth.uid(), company_id)
    );

CREATE POLICY "Employers can update jobs for their company"
    ON public.jobs FOR UPDATE
    TO authenticated
    USING (
        public.is_company_member(auth.uid(), company_id)
    );

-- Job Skills Requirements
CREATE POLICY "Job skills viewable by everyone"
    ON public.job_skills FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Employers can manage job skills for their jobs"
    ON public.job_skills FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.jobs j
            WHERE j.id = job_skills.job_id AND public.is_company_member(auth.uid(), j.company_id)
        )
    );

-- -----------------------------------------------------------------------------
-- 7. Applications & Saved Jobs Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Candidates can view their own applications"
    ON public.applications FOR SELECT
    TO authenticated
    USING (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Candidates can create applications"
    ON public.applications FOR INSERT
    TO authenticated
    WITH CHECK (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Employers can view applications for their company jobs"
    ON public.applications FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.jobs j
            WHERE j.id = applications.job_id AND public.is_company_member(auth.uid(), j.company_id)
        )
    );

CREATE POLICY "Employers can update application status for their company jobs"
    ON public.applications FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.jobs j
            WHERE j.id = applications.job_id AND public.is_company_member(auth.uid(), j.company_id)
        )
    );

-- Saved Jobs (Bookmarks)
CREATE POLICY "Candidates can manage their saved jobs"
    ON public.saved_jobs FOR ALL
    TO authenticated
    USING (
        candidate_id IN (
            SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()
        )
    );

-- -----------------------------------------------------------------------------
-- 8. Telegram Connections & Notifications Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view & manage their own Telegram connection"
    ON public.telegram_connections FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their notifications"
    ON public.notifications FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
    ON public.notifications FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
