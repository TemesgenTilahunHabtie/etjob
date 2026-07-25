import Link from "next/link";

/**
 * EmployerCTA Component
 * 
 * Purpose:
 * Employer-facing landing section highlighting recruitment features & candidate management dashboard.
 * Balances the homepage value proposition between job seekers and employers/recruiters.
 * 
 * Architectural & Future Backend Flow:
 * - Supabase Tables: `company_profiles`, `jobs`, `applications`, `saved_candidates`
 * - Employer Dashboard Flow:
 *   1. Post job vacancies (`jobs` table)
 *   2. Receive incoming candidate records (`applications` table)
 *   3. Filter & shortlist applicants via automated matching engine
 */
export default function EmployerCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white md:py-24">
      {/* Ambient Background Decorative Blur Gradients */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Employer Copy, Benefits & CTAs (6 Columns on Desktop) */}
          <div className="flex flex-col items-start lg:col-span-6">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur">
              <span>💼 For Employers & Recruiters</span>
            </div>

            {/* Main Headline */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the Right Talent Faster
            </h2>

            {/* Supporting Paragraph */}
            <p className="mt-4 text-base text-slate-300 sm:text-lg leading-relaxed">
              Post your jobs, discover qualified candidates, and manage applications through ETJob&apos;s recruitment platform.
            </p>

            {/* Employer Benefits List */}
            <div className="mt-8 flex flex-col gap-3.5 w-full">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Reach qualified candidates across top tech & business domains
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Manage applications easily with pre-filtered candidate profiles
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Find talent faster with smart automated candidate matching
                </span>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5 w-full sm:w-auto">
              <Link
                href="/jobs/new"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]"
              >
                <span>Post a Job</span>
                <span>→</span>
              </Link>

              <Link
                href="/employers"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3.5 text-center text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white dark:border-slate-700"
              >
                Explore Employer Solutions
              </Link>
            </div>

          </div>

          {/* Right Column: Employer Dashboard Interactive Visual Preview (6 Columns on Desktop) */}
          <div className="relative flex justify-center lg:col-span-6">
            
            {/* Ambient Backlight Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

            {/* Dashboard Container */}
            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl transition-all duration-300 hover:border-slate-700">
              
              {/* Dashboard Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-sm">
                    📊
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Employer Dashboard</h3>
                    <p className="text-[10px] text-slate-400">Live Candidate Pipeline</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  ● 4 Active Jobs
                </span>
              </div>

              {/* Key Metrics Stats Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
                  <span className="text-[10px] font-semibold text-slate-400">Active Jobs</span>
                  <p className="mt-0.5 text-base font-black text-white">4</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
                  <span className="text-[10px] font-semibold text-slate-400">Applications</span>
                  <p className="mt-0.5 text-base font-black text-blue-400">24</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
                  <span className="text-[10px] font-semibold text-slate-400">Shortlisted</span>
                  <p className="mt-0.5 text-base font-black text-emerald-400">8</p>
                </div>
              </div>

              {/* Candidate Match Spotlight Card */}
              <div className="mt-5 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-300">Top Candidate Match 🎯</span>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    ⚡ 94% Match
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-sm text-sm">
                    FD
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Frontend Developer Applicant</h4>
                    <p className="text-xs text-slate-300">5+ Yrs Experience • Addis Ababa</p>
                  </div>
                </div>

                {/* Skills Matched Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/60">
                    React
                  </span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/60">
                    TypeScript
                  </span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/60">
                    Next.js
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-indigo-500/40 bg-indigo-500/10 py-2 text-center text-xs font-bold text-indigo-300 transition-colors hover:bg-indigo-500/20"
                  >
                    Shortlist
                  </button>
                  <Link
                    href="/jobs"
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-blue-500 shadow-md shadow-blue-600/20"
                  >
                    View Application
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-center text-[11px] text-slate-400">
                Automated applicant matching & applicant tracking for verified employers.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
