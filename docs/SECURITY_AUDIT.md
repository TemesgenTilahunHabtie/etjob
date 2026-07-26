# ETJob Backend Security Audit Report

## Executive Summary
This document summarizes the security evaluation of the ETJob Supabase backend, RLS policies, key management, and session middleware.

---

## 1. Key Isolation Audit
- **Public Anon Key**: Exposed only as `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client queries.
- **Service Role Key**: Completely excluded from client/browser JavaScript bundles.

---

## 2. Row Level Security (RLS) Verification
- **Profiles**: Users can only update their own profile record.
- **Candidate Profiles & Applications**: Candidates can only manage their own applications and bookmarks.
- **Employer Companies & Jobs**: Employers can only edit companies where they hold member privileges (`owner`, `admin`, `recruiter`, `hr_manager`).

---

## 3. Middleware & CSRF Protection
- Session middleware (`middleware.ts`) intercepts requests to `/dashboard/*`, `/candidate/*`, and `/employer/*` to enforce valid JWT auth cookies before rendering pages.
