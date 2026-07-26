# ETJob API Architecture & Service Contracts

## Architecture Pattern
ETJob follows Next.js App Router Server Architecture with a modular Data Access Layer in `services/` and Auth Protection in `lib/auth/`.

```
React UI Components / App Router Pages
              │
              ▼
   Server Actions / Services Layer (`services/`)
              │
              ▼
    Supabase Typed Client (`lib/supabase/`)
              │
              ▼
       Supabase Cloud DB
```

---

## Service Contracts

### 1. Job Marketplace (`services/jobs.ts`, `services/search.ts`)
- `getFeaturedJobs(limit)`: Fetches active featured jobs.
- `getJobs()`: Fetches all active jobs.
- `getJobById(id)`: Fetches single job detail.
- `searchJobs(filters)`: Multi-criteria job search.

### 2. Applications (`services/applications.ts`)
- `applyForJob(jobId, candidateId, coverLetter)`: Submits new application.
- `getMyApplications(candidateId)`: Candidate application history.
- `getJobApplications(jobId)`: Employer candidate applications view.
- `updateApplicationStatus(applicationId, status)`: Status pipeline updates.
- `withdrawApplication(applicationId)`: Candidate application cancellation.

### 3. Employers & Companies (`services/employer.ts`, `services/companies.ts`)
- `createCompany(ownerId, data)`: Registers organization.
- `addCompanyMember(companyId, userId, role)`: Adds recruiter/HR team member.
- `createJob(jobData)` / `updateJob(jobId, data)` / `deleteJob(jobId)`: Job post management.

### 4. Candidates (`services/candidate.ts`, `services/savedJobs.ts`)
- `createCandidateProfile(userId)` / `updateCandidateProfile(id, updates)`: Profile updates.
- `addSkill(candidateId, skillId)` / `removeSkill(id)`: Skill matrix updates.
- `saveJob(candidateId, jobId)` / `unsaveJob(candidateId, jobId)`: Bookmarks.

### 5. Authentication (`lib/auth/`)
- `requireUser()`: Asserts authenticated session.
- `requireCandidate()`: Asserts candidate role.
- `requireEmployer()`: Asserts employer role.
