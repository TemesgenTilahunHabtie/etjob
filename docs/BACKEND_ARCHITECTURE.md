# ETJob Production Backend Architecture

## Overview
ETJob is built on Next.js 16 App Router with a modular Supabase PostgreSQL database layer. The backend architecture decouples data access services (`services/`), authorization rules (`lib/auth/`), database typings (`lib/types/`), and edge session middleware (`middleware.ts`).

---

## 1. Architectural Layers

```
                                  Client Browser
                                        │
                                        ▼
                             Edge Middleware Protection
                                  (`middleware.ts`)
                                        │
                                        ▼
                             Next.js App Router Pages
                          & API Handlers (`app/api/auth`)
                                        │
                                        ▼
                            Data Access Services Layer
                                   (`services/`)
                                        │
                                        ▼
                         Typed Supabase Client Factory
                              (`lib/supabase/`)
                                        │
                                        ▼
                     Supabase Cloud PostgreSQL + RLS
```

---

## 2. Service Modules Map

1. `services/jobs.ts`: Public & candidate job queries.
2. `services/categories.ts`: Marketplace category taxonomies & dynamic open job count views.
3. `services/jobManagement.ts`: Employer job creation, editing, status pipeline (`draft` → `active` → `paused` → `closed` → `expired`).
4. `services/applications.ts`: Applicant tracking system (ATS) workflow (`submitted` → `under_review` → `shortlisted` → `interviewing` → `offered` → `rejected` → `withdrawn`).
5. `services/companies.ts`: Organization registry & team access roles (`owner`, `admin`, `recruiter`, `hr_manager`).
6. `services/employer.ts`: High-level employer metrics and organization management.
7. `services/candidate.ts` & `services/candidates.ts`: Candidate profiles, resumes, skill matrix, and preferences.
8. `services/savedJobs.ts`: Bookmark management.
9. `services/dashboard.ts`: Candidate & Employer real-time aggregated metric analytics.
10. `services/search.ts`: Multi-criteria search engine & `matchJobsToCandidate()` AI vector match architecture.
11. `services/notificationService.ts`: Application & job alert dispatching.
