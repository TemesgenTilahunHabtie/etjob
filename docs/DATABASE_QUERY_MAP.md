# ETJob Database Query & Table Mapping

## Table Relationships & Indexes

### Tables Map (14 Core Tables)
1. `profiles` -> Primary user identity (1:1 auth.users)
2. `candidate_profiles` -> Candidate resume & bio (1:1 profiles)
3. `skills` -> Master skill taxonomy
4. `candidate_skills` -> Candidate skills junction
5. `job_preferences` -> Search criteria (1:1 candidate_profiles)
6. `companies` -> Employer organization
7. `company_members` -> Team roles (owner, admin, recruiter, hr_manager)
8. `job_categories` -> Categories taxonomy
9. `jobs` -> Marketplace job postings
10. `job_skills` -> Job requirements junction
11. `applications` -> Submissions & status pipeline
12. `saved_jobs` -> Candidate bookmarks
13. `telegram_connections` -> Telegram accounts
14. `notifications` -> Alert notifications queue

### Dynamic Views
- `category_job_counts`: Pre-computed active job counts grouped by category.
