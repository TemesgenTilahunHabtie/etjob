import Link from "next/link";
import Image from "next/image";
import { MOCK_JOBS } from "@/data/mockJobs";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

const POPULAR_CATEGORIES: CategoryItem[] = [
  { id: "cat-1", name: "Software Engineering", slug: "software-engineering", icon: "💻" },
  { id: "cat-2", name: "Design & Creative", slug: "design-creative", icon: "🎨" },
  { id: "cat-3", name: "Marketing", slug: "marketing", icon: "🚀" },
  { id: "cat-4", name: "Finance", slug: "finance", icon: "📈" },
  { id: "cat-5", name: "Sales", slug: "sales", icon: "💼" },
  { id: "cat-6", name: "Customer Support", slug: "customer-support", icon: "🎧" },
  { id: "cat-7", name: "Healthcare", slug: "healthcare", icon: "🏥" },
  { id: "cat-8", name: "Education", slug: "education", icon: "🎓" },
  { id: "cat-9", name: "Engineering", slug: "engineering", icon: "⚙️" },
  { id: "cat-10", name: "Remote Jobs", slug: "remote-jobs", icon: "🌐" },
];

/**
 * FeaturedJobs Component
 * 
 * Purpose:
 * High-density marketplace discovery section pairing a compact 2-job preview card
 * with a prominent category exploration grid ("Find Jobs by Category").
 * 
 * Architectural & Future Backend Flow:
 * - Featured Jobs Query: `supabase.from('jobs').select('*').eq('featured', true).limit(2)`
 * - Categories Query: `supabase.from('job_categories').select('*').order('name', { ascending: true })`
 */
export default function FeaturedJobs() {
  // Select top 2 featured jobs for a lightweight preview
  const previewJobs = MOCK_JOBS.slice(0, 2);

  return (
    <section className="py-10 md:py-14 bg-slate-50/50 dark:bg-slate-950/50 border-y border-slate-200/60 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Preview Section: Featured Jobs */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-0.5 text-[11px] font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
                Featured Jobs
              </div>
              <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400">
                • Top opportunities right now
              </h2>
            </div>

            <Link
              href="/jobs"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>View All Jobs</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Compact 2-Job Preview Cards Grid */}
          <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {previewJobs.map((job) => (
              <div
                key={job.id}
                className="group relative flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
              >
                <div className="flex items-center gap-3">
                  {/* Company Logo / Avatar */}
                  {job.companyLogo ? (
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-800">
                      <Image
                        src={job.companyLogo}
                        alt={job.companyName}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600 text-xs dark:bg-blue-950 dark:text-blue-400">
                      {job.companyName.substring(0, 2).toUpperCase()}
                    </div>
                  )}

                  {/* Compact Job Info */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.companyName}</span>
                      <span className="text-[10px] text-slate-400">• {job.location}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                  </div>
                </div>

                {/* View Job CTA Button */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span>View Job →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Main Focus Area: Find Jobs by Category */}
        <div className="mt-10 border-t border-slate-200/80 pt-8 dark:border-slate-800">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Find Jobs by Category
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs text-slate-600 sm:text-sm dark:text-slate-400">
              Browse opportunities across different industries and career paths.
            </p>
          </div>

          {/* Prominent Category Cards Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
            {POPULAR_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/jobs?category=${category.slug}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-4.5 text-center shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
              >
                <span className="text-2xl transition-transform group-hover:scale-110">
                  {category.icon}
                </span>
                <span className="mt-2.5 text-xs font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Primary Category CTA Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/jobs/categories"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              <span>View All Job Categories</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
