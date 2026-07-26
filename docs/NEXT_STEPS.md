# Next Implementation Steps — ETJob

## Upcoming Implementation Roadmap

### Step 1: Authentication UI & Onboarding Pages
- Implement Next.js App Router login, signup, and role selection pages (`/auth/login`, `/auth/signup`).
- Integrate Supabase Auth Auth UI / OAuth providers (Google, Email magic link).
- Build onboarding flow (`/onboarding/candidate` vs `/onboarding/employer`).

### Step 2: Employer Dashboard
- Create employer management views (`/employer/dashboard`, `/employer/jobs/new`, `/employer/applications`).
- Wire `services/employer.ts` and `services/applications.ts` to live UI forms.

### Step 3: Candidate Dashboard & Application Flow
- Build job detail application modal & candidate application tracker (`/candidate/applications`, `/candidate/saved`).
- Wire `services/applications.ts` and `services/savedJobs.ts` to interactive buttons.

### Step 4: AI Job Matching Engine & Telegram Assistant
- Implement pgvector similarity search function using OpenAI embeddings.
- Wire Telegram Webhook bot to `services/notifications.ts`.
