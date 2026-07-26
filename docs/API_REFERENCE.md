# ETJob Data Access API Reference

## Services API Directory

### 1. Job Services (`services/jobs.ts`, `services/jobManagement.ts`)
- `getFeaturedJobs(limit)`: Top active featured jobs.
- `getJobs()`: Active marketplace jobs list.
- `getJobById(id)`: Single job detail with company information.
- `createManagedJob(input)`: Validates and inserts job posting.
- `updateJobStatus(jobId, status)`: Updates job lifecycle status (`active`, `paused`, `closed`).

### 2. Applications (`services/applications.ts`)
- `applyForJob(jobId, candidateId, coverLetter)`: Submits job application.
- `getMyApplications(candidateId)`: Candidate application tracker.
- `getJobApplications(jobId)`: Employer applicant review list.
- `updateApplicationStatus(applicationId, status)`: Application pipeline status transition.

### 3. Analytics (`services/dashboard.ts`)
- `getCandidateDashboard(userId)`: Candidate dashboard metrics.
- `getEmployerDashboard(userId)`: Employer company & job metrics.
