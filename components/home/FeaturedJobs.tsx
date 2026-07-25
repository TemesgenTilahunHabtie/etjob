import Link from "next/link";
import JobCard from "@/components/jobs/JobCard";
import { MOCK_JOBS } from "@/data/mockJobs";

/**
 * FeaturedJobs Component
 * 
 * Purpose:
 * Renders a curated grid of highlighted job vacancies on the landing page paired with a Telegram conversion banner.
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
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
              Latest Opportunities
            </div>
            <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Featured Opportunities
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400 max-w-2xl">
              Hand-picked jobs from verified employers. Get notified instantly when similar roles match your profile.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View All Jobs</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Jobs Responsive Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Telegram Conversion Banner Below Grid */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                <span>⚡ Instant Job Delivery</span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">
                Want opportunities like these automatically?
              </h3>
              <p className="mt-1.5 text-sm text-blue-100/90 leading-relaxed">
                Connect ETJob Assistant and receive personalized job alerts directly on Telegram.
              </p>
            </div>

            <Link
              href="/telegram/connect"
              className="whitespace-nowrap rounded-xl bg-white px-6 py-3.5 text-center text-sm font-bold text-blue-700 shadow-md transition-all duration-200 hover:bg-blue-50 active:scale-[0.98]"
            >
              Connect Telegram →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
