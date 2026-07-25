import Link from "next/link";
import JobCard from "@/components/jobs/JobCard";
import { MOCK_JOBS } from "@/data/mockJobs";

/**
 * FeaturedJobs Component
 * 
 * Purpose:
 * Renders a curated grid of highlighted job vacancies on the landing page.
 * 
 * Architectural & Future Integration Notes:
 * - Current State: Consumes seed data imported from `data/mockJobs.ts`.
 * - Future Supabase Integration:
 *   `MOCK_JOBS` will be replaced by an async data fetch calling `getFeaturedJobs()`
 *   from `services/jobs.ts` which queries Supabase:
 *   `supabase.from('jobs').select('*').eq('featured', true).limit(6)`
 */
export default function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
              Verified Listings
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Featured Opportunities
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Hand-picked opportunities from leading employers and top startups.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View All Jobs &rarr;
          </Link>
        </div>

        {/* Jobs Responsive Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
}
