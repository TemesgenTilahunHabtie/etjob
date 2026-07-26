-- ETJob Supabase Production Database Schema Migration
-- Migration ID: 20260725000000_initial_schema.sql
-- Description: Production-ready marketplace architecture with native PostgreSQL Enums, pgvector AI support, indexes, triggers, and helper views.

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector"; -- Enables pgvector for AI semantic candidate/job matching embeddings

-- 2. Define Custom Domain ENUM Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('candidate', 'employer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE experience_level_type AS ENUM ('entry', 'mid', 'senior', 'lead', 'executive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE employment_type_enum AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status_enum AS ENUM ('draft', 'active', 'paused', 'closed', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status_enum AS ENUM ('submitted', 'under_review', 'shortlisted', 'interviewing', 'offered', 'rejected', 'withdrawn');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE company_member_role AS ENUM ('owner', 'admin', 'recruiter', 'hr_manager');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type_enum AS ENUM ('job_match', 'application_status', 'system_alert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Reusable Trigger Function for Automatic Timestamp Updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 4. Core Identity & Candidate Subsystem
-- -----------------------------------------------------------------------------

-- Table 1: profiles (Linked 1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'candidate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Table 2: candidate_profiles (Job Seeker Extended Profile)
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    headline TEXT,
    bio TEXT,
    location TEXT,
    years_experience INTEGER DEFAULT 0 CHECK (years_experience >= 0),
    resume_url TEXT,
    profile_completion INTEGER DEFAULT 0 CHECK (profile_completion BETWEEN 0 AND 100),
    embedding vector(1536), -- Candidate profile AI embedding for similarity matching
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_candidate_profiles_updated_at
    BEFORE UPDATE ON public.candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Table 3: skills (Master Skill Taxonomy)
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 4: candidate_skills (Junction table with skill proficiency)
CREATE TABLE IF NOT EXISTS public.candidate_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    experience_level experience_level_type DEFAULT 'mid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(candidate_id, skill_id)
);

-- Table 5: job_preferences (Candidate Search Criteria for AI Matching Engine)
CREATE TABLE IF NOT EXISTS public.job_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE UNIQUE,
    preferred_locations JSONB DEFAULT '[]'::jsonb,
    preferred_job_types JSONB DEFAULT '[]'::jsonb,
    salary_expectation INTEGER DEFAULT 0 CHECK (salary_expectation >= 0),
    remote_preference BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. Employer & Organization Subsystem
-- -----------------------------------------------------------------------------

-- Table 6: companies (Employer Organization)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- Added for SEO-friendly URLs (/companies/acme-corp)
    logo_url TEXT,
    description TEXT,
    industry TEXT,
    location TEXT,
    website TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Table 7: company_members (Team Access Control)
CREATE TABLE IF NOT EXISTS public.company_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role company_member_role NOT NULL DEFAULT 'recruiter',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, user_id)
);

-- -----------------------------------------------------------------------------
-- 6. Job Marketplace Subsystem
-- -----------------------------------------------------------------------------

-- Table 8: job_categories (Dynamic Job Categories Taxonomy)
CREATE TABLE IF NOT EXISTS public.job_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT, -- Category overview text
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 9: jobs (Main Job Postings Table)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.job_categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type employment_type_enum NOT NULL DEFAULT 'Full-time',
    salary_min INTEGER CHECK (salary_min >= 0),
    salary_max INTEGER CHECK (salary_max IS NULL OR salary_max >= salary_min),
    experience_level experience_level_type DEFAULT 'mid',
    remote BOOLEAN DEFAULT false,
    status job_status_enum NOT NULL DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
    application_count INTEGER DEFAULT 0 CHECK (application_count >= 0),
    embedding vector(1536), -- Native vector column for OpenAI/AI embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Table 10: job_skills (Job Skill Requirements)
CREATE TABLE IF NOT EXISTS public.job_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, skill_id)
);

-- -----------------------------------------------------------------------------
-- 7. Application & Bookmarks Subsystem
-- -----------------------------------------------------------------------------

-- Table 11: applications (Candidate Job Submissions)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    status application_status_enum NOT NULL DEFAULT 'submitted',
    cover_letter TEXT,
    match_score INTEGER DEFAULT 0 CHECK (match_score BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, candidate_id)
);

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Atomic Trigger to keep jobs.application_count accurate
CREATE OR REPLACE FUNCTION increment_job_application_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.jobs
    SET application_count = application_count + 1
    WHERE id = NEW.job_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_application_count
    AFTER INSERT ON public.applications
    FOR EACH ROW EXECUTE FUNCTION increment_job_application_count();

-- Table 12: saved_jobs (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(candidate_id, job_id)
);

-- -----------------------------------------------------------------------------
-- 8. Telegram Bot & Notification Subsystem
-- -----------------------------------------------------------------------------

-- Table 13: telegram_connections (Linked Telegram Account)
CREATE TABLE IF NOT EXISTS public.telegram_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    telegram_id TEXT UNIQUE,
    username TEXT,
    connected BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 14: notifications (Telegram Alert Queue)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    type notification_type_enum NOT NULL DEFAULT 'job_match',
    message TEXT NOT NULL,
    sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. Comprehensive Performance & Search Indexes
-- -----------------------------------------------------------------------------

-- Full-text Search Index for Jobs
CREATE INDEX IF NOT EXISTS idx_jobs_title_search ON public.jobs USING gin (to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs (location);
CREATE INDEX IF NOT EXISTS idx_jobs_category_id ON public.jobs (category_id);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs (company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON public.jobs (featured) WHERE featured = true;

-- Marketplace Discovery & Matching Indexes
CREATE INDEX IF NOT EXISTS idx_job_skills_composite ON public.job_skills (job_id, skill_id);
CREATE INDEX IF NOT EXISTS idx_candidate_skills_composite ON public.candidate_skills (candidate_id, skill_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_status ON public.applications (job_id, status);
CREATE INDEX IF NOT EXISTS idx_applications_candidate_id ON public.applications (candidate_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_candidate ON public.saved_jobs (candidate_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telegram_id_lookup ON public.telegram_connections (telegram_id);
CREATE INDEX IF NOT EXISTS idx_notifications_pending ON public.notifications (user_id, sent) WHERE sent = false;

-- Vector Index for AI Cosine Similarity Search (IVFFlat Index)
CREATE INDEX IF NOT EXISTS idx_jobs_embedding ON public.jobs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- -----------------------------------------------------------------------------
-- 10. Dynamic Category Count View (Homepage Support)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.category_job_counts AS
SELECT 
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    c.icon AS category_icon,
    c.description AS category_description,
    COUNT(j.id) FILTER (WHERE j.status = 'active') AS open_job_count
FROM public.job_categories c
LEFT JOIN public.jobs j ON c.id = j.category_id
GROUP BY c.id, c.name, c.slug, c.icon, c.description;
