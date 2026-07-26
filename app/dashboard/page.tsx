import { getCandidateDashboard } from "@/services/dashboard";
import Link from "next/link";

export default async function DashboardPage() {
  const candidateData = await getCandidateDashboard("demo-user");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Dashboard</h1>
          <p className="mt-1 text-xs text-slate-500">Track your job applications, saved opportunities, and profile progress.</p>
        </div>
        <Link
          href="/jobs"
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
        >
          Explore Jobs →
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-500">Profile Completion</div>
          <div className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {candidateData.profileCompletion}%
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-500">Submitted Applications</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {candidateData.applicationsCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-500">Saved Opportunities</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {candidateData.savedJobsCount}
          </div>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Opportunities</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {candidateData.recommendedJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span className="text-xs font-bold text-slate-500">{job.companyName}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h3>
                <span className="text-xs text-slate-400">{job.location} • {job.employmentType}</span>
              </div>
              <Link
                href={`/jobs/${job.id}`}
                className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400"
              >
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
