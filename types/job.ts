export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type WorkplaceType = "On-site" | "Hybrid" | "Remote";

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
