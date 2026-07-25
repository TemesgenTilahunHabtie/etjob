"use client";

import Link from "next/link";

/**
 * HeroSection Component
 * 
 * Purpose:
 * Primary landing page hero component introducing ETJob's value proposition.
 * Combines immediate job search capability with an AI-powered Telegram Job Assistant displayed on a realistic phone mockup.
 * 
 * Architectural & Future Integration Notes:
 * - Search Interface:
 *   Submits search queries (keywords, location) to `/jobs?q=...` invoking `services/jobs.ts`.
 * - Telegram Assistant Visual Ecosystem:
 *   Demonstrates the automated matching & notification workflow (matching engine + Telegram Bot API).
 */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-8 md:py-12 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950">
      {/* Ambient Background Decorative Blur Gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-600/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Search UI, AI Assistant Card, Tags */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Telegram Job Alert Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Telegram Job Assistant Included</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Discover Opportunities.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                Get Hired Faster.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-2 text-base text-slate-600 sm:text-lg dark:text-slate-300">
              ETJob connects job seekers with verified employers and delivers personalized job alerts directly to your Telegram.
            </p>

            {/* Primary Highly Visible Search Interface Box */}
            <div className="mt-5 w-full rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-blue-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3 md:flex-row md:items-center"
              >
                {/* Keyword Input */}
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-3.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-800/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400"
                  />
                </div>

                {/* Location Input */}
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-3.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-800/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400"
                  />
                </div>

                {/* Enhanced Search Button CTA */}
                <button
                  type="button"
                  className="w-full whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98] md:w-auto"
                >
                  Find Matching Jobs →
                </button>
              </form>
            </div>

            {/* Helper Text below Search Box */}
            <p className="mt-2 text-center text-xs text-slate-500 sm:text-left dark:text-slate-400">
              Search thousands of opportunities or let ETJob&apos;s AI Assistant find matches for you.
            </p>

            {/* Premium AI Job Matching Assistant Feature Card */}
            <div className="mt-4 w-full rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white/90 p-3.5 shadow-md shadow-blue-500/10 backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/15 dark:border-blue-900/40 dark:from-slate-900/90 dark:via-blue-950/40 dark:to-slate-900/90">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                  🤖 AI Job Matching Assistant
                </span>
                <div className="flex items-center gap-1.5 rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  <span>● Monitoring jobs 24/7</span>
                </div>
              </div>

              <h3 className="mt-1.5 text-xs font-bold text-slate-900 dark:text-white">
                Never Miss the Right Opportunity Again
              </h3>
              
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                ETJob continuously monitors jobs matching your skills and preferences — delivering them instantly to Telegram.
              </p>

              {/* 3 Compact Benefits */}
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <span className="text-blue-600 dark:text-blue-400">✓</span> Personalized matching
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-blue-600 dark:text-blue-400">✓</span> Instant Telegram alerts
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-blue-600 dark:text-blue-400">✓</span> Apply before others
                </span>
              </div>
            </div>

            {/* Popular Search Tags */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular:</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-0.5 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Frontend</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-0.5 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Software Engineer</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-0.5 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Marketing</span>
              <span className="cursor-pointer rounded-md bg-slate-100 px-2.5 py-0.5 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">Remote</span>
            </div>

            {/* Trust Statements Section */}
            <div className="mt-6 grid w-full grid-cols-1 gap-3 border-t border-slate-200/80 pt-4 sm:grid-cols-3 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Personalized Matching</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Verified Employers</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Smart Job Matching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Straight Smartphone Device Mockup displaying Telegram Assistant */}
          <div className="relative flex justify-center py-4 lg:col-span-5 lg:py-0">
            
            {/* Blue Ambient Glow Effect Behind Phone */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-600/30"
              aria-hidden="true"
            />

            {/* Single Floating Card Top Right: 🔔 Bell + ⚡ 94% Match */}
            <div className="absolute -top-4 -right-4 z-30 hidden rounded-xl border border-emerald-200/90 bg-white/95 p-2.5 shadow-xl backdrop-blur transition-all duration-300 hover:scale-105 sm:flex items-center gap-2.5 dark:border-emerald-900/60 dark:bg-slate-900/95">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold dark:bg-blue-950 dark:text-blue-400">
                🔔
              </span>
              <div>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">⚡ 94% Match</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Senior Frontend Developer</p>
              </div>
            </div>

            {/* Physical Smartphone Chassis */}
            <div className="relative mx-auto w-full max-w-[320px] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 p-1.5 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-800/80">
              
              {/* Physical Left Volume Buttons */}
              <div className="absolute -left-[14px] top-20 h-7 w-1 rounded-l-md bg-slate-800 shadow-sm" />
              <div className="absolute -left-[14px] top-30 h-7 w-1 rounded-l-md bg-slate-800 shadow-sm" />
              
              {/* Physical Right Power Button */}
              <div className="absolute -right-[14px] top-24 h-10 w-1 rounded-r-md bg-slate-800 shadow-sm" />

              {/* Phone Camera Notch Header (Centered Dynamic Island & Status Bar) */}
              <div className="relative top-0 z-20 flex h-7 w-full items-center justify-between rounded-t-[38px] bg-slate-950 px-5 text-white">
                <span className="w-10 text-[10px] font-bold text-slate-300">9:41</span>
                
                {/* Centered Dynamic Island Pill */}
                <div className="flex h-3.5 w-20 items-center justify-center rounded-full bg-black px-2 shadow-inner">
                  <div className="h-2 w-2 rounded-full bg-slate-800" />
                </div>

                <div className="flex w-10 items-center justify-end gap-1">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  <div className="h-2 w-3 rounded bg-slate-400" />
                </div>
              </div>

              {/* Phone Screen Glass Viewport with Subtle Screen Glare Overlay */}
              <div className="relative overflow-hidden rounded-[36px] bg-white dark:bg-slate-950">
                
                {/* Screen Reflection Overlays */}
                <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />

                {/* Telegram App Bar Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-3.5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur shadow-sm">
                        <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-xs font-bold text-white tracking-tight">ETJob Assistant</h3>
                          <svg className="h-3.5 w-3.5 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-[10px] font-medium text-blue-100/90">Verified Bot</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  {/* 24/7 Callout Pill */}
                  <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur border border-white/20">
                    <span>⚡</span>
                    <span>Get notified on Telegram 24/7</span>
                  </div>
                </div>

                {/* Telegram Application Notification Feed Stream */}
                <div className="p-3.5 space-y-2.5">
                  {/* Primary Featured Telegram Notification Bubble */}
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">New Job Match 🚀</span>
                      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        ⚡ 94% Match
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-xs font-bold text-slate-900 dark:text-white">Senior Frontend Developer</h4>
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">ABC Technology Ltd.</p>

                    <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-slate-600 dark:text-slate-300">
                      <span className="rounded bg-white px-1.5 py-0.5 shadow-xs dark:bg-slate-800">Addis Ababa</span>
                      <span className="rounded bg-white px-1.5 py-0.5 shadow-xs dark:bg-slate-800">Full-time</span>
                      <span className="rounded bg-white px-1.5 py-0.5 shadow-xs dark:bg-slate-800">ETB 60,000/mo</span>
                    </div>

                    {/* Simulated Telegram Action Buttons */}
                    <div className="mt-3 flex gap-1.5">
                      <Link
                        href="/jobs"
                        className="flex-1 rounded-md border border-blue-600 bg-white py-1.5 text-center text-[10px] font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
                      >
                        View Job
                      </Link>
                      <Link
                        href="/jobs"
                        className="flex-1 rounded-md bg-blue-600 py-1.5 text-center text-[10px] font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>

                  {/* Secondary Match Bubble */}
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Full Stack Engineer</span>
                      <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">92% Match</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">FinTech Solutions • Addis Ababa</p>
                  </div>

                  {/* Tertiary Match Bubble */}
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">UI/UX Product Designer</span>
                      <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">90% Match</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">Creative Hub • Remote</p>
                  </div>

                  <p className="pt-1 text-center text-[10px] text-slate-500 dark:text-slate-400">
                    Set preferences on ETJob & receive alerts directly on Telegram.
                  </p>
                </div>

                {/* Phone Bottom Home Indicator Bar */}
                <div className="flex justify-center pb-2.5 pt-1">
                  <div className="h-1 w-28 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
