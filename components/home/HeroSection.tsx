"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-12 md:py-20 lg:py-24 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950">
      {/* Background Decorative Blur */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Search UI, Tags */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Telegram Job Alert Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Telegram Job Assistant Included</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Discover Opportunities.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                Get Hired Faster.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-4 text-lg text-slate-600 sm:text-xl dark:text-slate-300">
              ETJob connects job seekers with verified employers and delivers personalized job alerts directly to your Telegram.
            </p>

            {/* Search Interface Box */}
            <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3 md:flex-row md:items-center"
              >
                {/* Keyword Input */}
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    className="w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>

                {/* Location Input */}
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 md:w-auto"
                >
                  Search Jobs
                </button>
              </form>
            </div>

            {/* Popular Search Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Frontend</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Software Engineer</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Marketing</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-1 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Remote</span>
            </div>

            {/* Trust Statements Section */}
            <div className="mt-10 grid w-full grid-cols-1 gap-4 border-t border-slate-200/80 pt-6 sm:grid-cols-3 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Personalized Matching</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Verified Employers</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Instant Telegram Alerts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Telegram Alert Card Preview */}
          <div className="flex justify-center lg:col-span-5">
            <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">ETJob Assistant</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Instant Match Alert</p>
                  </div>
                </div>
                <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  LIVE BOT
                </span>
              </div>

              {/* Card Body - Simulated Telegram Message */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">New Job Match 🚀</span>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>

                <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">Frontend Developer</h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">ABC Technology Ltd.</p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="rounded bg-white px-2 py-1 shadow-sm dark:bg-slate-700">Addis Ababa</span>
                  <span className="rounded bg-white px-2 py-1 shadow-sm dark:bg-slate-700">Full-time</span>
                  <span className="rounded bg-white px-2 py-1 shadow-sm dark:bg-slate-700">2+ years exp</span>
                </div>

                {/* Simulated Telegram Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/jobs"
                    className="flex-1 rounded-lg border border-blue-600 bg-white py-2 text-center text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
                  >
                    View Job
                  </Link>
                  <Link
                    href="/jobs"
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
                Set preferences on ETJob & receive alerts directly on Telegram.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
