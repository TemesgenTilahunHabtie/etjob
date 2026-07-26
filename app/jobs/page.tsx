import { getJobs } from "@/services/jobs";
import Link from "next/link";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Explore All Job Opportunities
        </h1>
        <p className="text-xs text-slate-500 sm:text-sm">
          Discover remote and local careers in Ethiopia and worldwide.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{job.companyName}</span>
                {job.featured && (
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{job.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">{job.description}</p>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{job.location} • {job.workplaceType}</span>
              <Link
                href={`/jobs/${job.id}`}
                className="rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                View Job →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
