export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type WorkplaceType = "On-site" | "Hybrid" | "Remote";

/**
 * Job Data Contracts & Models
 * 
 * Architectural & Future Integration Notes:
 * - This interface directly mirrors the schema of the future Supabase `jobs` table.
 * - Field mapping: `createdAt` corresponds to the standard PostgreSQL `created_at` timestamp column.
 * - Serves as the authoritative type definition shared across UI components (`JobCard`, `FeaturedJobs`),
 *   business services (`services/jobs.ts`), and Supabase API responses.
 */
export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  employmentType: EmploymentType;
  workplaceType: WorkplaceType;
  salaryRange?: string;
  description: string;
  skills: string[];
  createdAt: string;
  featured?: boolean;
}
