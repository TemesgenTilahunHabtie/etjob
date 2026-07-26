# ETJob Database Status & Schema Overview

## Database Engine & Setup
- **Platform**: Supabase PostgreSQL 15+
- **Extensions**: `uuid-ossp`, `pgcrypto`, `vector` (pgvector for AI embeddings)
- **Security**: Row Level Security (RLS) enabled across 100% of tables in `20260725000001_row_level_security.sql`.

---

## Table Inventory (14 Public Tables)

| Table | Purpose | RLS Status |
| :--- | :--- | :---: |
| `profiles` | Core Auth Identity (1:1 with auth.users) | Enabled |
| `candidate_profiles` | Job Seeker extended profile & resume | Enabled |
| `skills` | Master skill taxonomy | Enabled |
| `candidate_skills` | Junction table for candidate skill proficiencies | Enabled |
| `job_preferences` | Candidate job criteria for AI matching | Enabled |
| `companies` | Employer organization profile | Enabled |
| `company_members` | Organization team access control | Enabled |
| `job_categories` | Marketplace categories taxonomy | Enabled |
| `jobs` | Job postings table | Enabled |
| `job_skills` | Job skill requirements | Enabled |
| `applications` | Candidate job submissions | Enabled |
| `saved_jobs` | Candidate bookmarks | Enabled |
| `telegram_connections` | Linked Telegram accounts | Enabled |
| `notifications` | Telegram notification queue | Enabled |

---

## Views & Performance Indexes
- **`category_job_counts`**: Real-time view computing open active jobs per category.
- **Indexes**: Full-text GIN search on job titles (`idx_jobs_title_search`), composite skill indexes, and IVFFlat vector index (`idx_jobs_embedding`) for AI matching.
