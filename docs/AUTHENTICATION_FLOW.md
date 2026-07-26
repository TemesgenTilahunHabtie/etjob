# ETJob Authentication & Authorization Flow

## Session Architecture
Authentication is powered by Supabase Auth with server-side cookie persistence via `@supabase/ssr`.

```
User Sign Up / Login -> Supabase Auth -> JWT Session Cookie -> Middleware Session Validation -> RLS Security
```

---

## 1. Authentication Endpoints

- **`POST /api/auth/signup`**: Creates `auth.users` record and automatically populates `profiles` and `candidate_profiles` rows.
- **`POST /api/auth/login`**: Validates credentials and sets HTTP-only session cookies.
- **`POST /api/auth/logout`**: Clears authentication cookies.
- **`GET /api/auth/callback`**: Confirms email / OAuth magic link tokens.

---

## 2. Role-Based Authorization Matrix

| Role | Access Permissions |
| :--- | :--- |
| **Candidate** | Manage own candidate profile, apply for jobs, save/bookmark jobs, view application status history. |
| **Employer** | Create & manage companies where member, post/edit/close jobs, view & update applicant statuses. |
| **Admin** | Full system oversight & administrative management. |
