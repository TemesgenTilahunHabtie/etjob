import Link from "next/link";

/**
 * TelegramFeature Component
 * 
 * Purpose:
 * Premium SaaS product explanation section demonstrating how ETJob's intelligent matching engine
 * works together with the Telegram Bot Assistant to deliver instant personalized job notifications.
 * 
 * Architectural & Future Backend Flow:
 * - Supabase Database: `users`, `profiles`, `job_preferences`, `jobs`
 * - Matching Engine: Background service queries new jobs against active `job_preferences` criteria
 * - Telegram Bot API: Dispatches rich notification payloads containing match score & direct action links
 * 
 * Flow:
 * Candidate Preferences → ETJob Matching Engine → Telegram Bot API → Candidate Notification
 */

export default function TelegramFeature() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white md:py-24">
      {/* Background Ambient Glow Gradients */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Product Marketing & Benefits */}
          <div className="flex flex-col items-start lg:col-span-6">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
              </svg>
              <span>Automated Job Matching</span>
            </div>

            {/* Headline */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Personal Job Assistant, Working 24/7
            </h2>

            {/* Supporting Text */}
            <p className="mt-4 text-base text-slate-300 sm:text-lg leading-relaxed">
              Tell ETJob what you are looking for. Our assistant monitors opportunities and delivers relevant job matches directly to your Telegram.
            </p>

            {/* Benefit Rows */}
            <div className="mt-8 flex flex-col gap-4 w-full">
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Set your job preferences (title, location, salary & skills)
                </span>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Receive matching opportunities instantly via Telegram
                </span>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-800/40 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/70">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Apply before everyone else with 1-click links
                </span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-8">
              <Link
                href="/telegram/connect"
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
                </svg>
                <span>Connect Telegram Assistant →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Workflow Visualization (Matching Engine Diagram + Telegram Card) */}
          <div className="relative flex justify-center lg:col-span-6">
            
            {/* Ambient Backlight Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            {/* Workflow Diagram Container */}
            <div className="w-full max-w-lg space-y-4">
              
              {/* Step 1: User Preferences Card */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">User Preferences</h4>
                    <p className="text-[11px] text-slate-400">Frontend • Remote • Min. ETB 50,000</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                  ⚙️ Preferences Saved
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-blue-400 text-xs shadow-sm">
                  ↓
                </div>
              </div>

              {/* Step 2: ETJob Matching Engine Card */}
              <div className="flex items-center justify-between rounded-xl border border-indigo-500/30 bg-gradient-to-r from-blue-950/60 to-indigo-950/60 p-3.5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">ETJob Matching Engine</h4>
                    <p className="text-[11px] text-slate-300">Evaluating new postings against candidate criteria</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 animate-pulse">
                  ⚡ Live Matching
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-blue-400 text-xs shadow-sm">
                  ↓
                </div>
              </div>

              {/* Step 3: Realistic Telegram Notification Card with Floating Mini Badges */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
                
                {/* Floating Mini Badges */}
                <div className="absolute -top-3 -right-2 hidden sm:flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-slate-900 px-3 py-1 text-[10px] font-bold text-blue-400 shadow-md backdrop-blur">
                  <span>🎯</span>
                  <span>Skills matched</span>
                </div>
                
                <div className="absolute top-1/2 -left-4 hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-slate-900 px-3 py-1 text-[10px] font-bold text-emerald-400 shadow-md backdrop-blur">
                  <span>📍</span>
                  <span>Location matched</span>
                </div>

                <div className="absolute -bottom-3 -right-2 hidden sm:flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-slate-900 px-3 py-1 text-[10px] font-bold text-indigo-400 shadow-md backdrop-blur">
                  <span>⚙️</span>
                  <span>Preference matched</span>
                </div>

                {/* Telegram Bot Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                      <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs font-bold text-white">ETJob Assistant</h3>
                        <svg className="h-3.5 w-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-slate-400">Verified Bot</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                    ONLINE
                  </span>
                </div>

                {/* Telegram Alert Message Bubble */}
                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">🚀 New Job Match</span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      ⚡ 94% Match
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-bold text-white">Senior Frontend Developer</h4>
                  <p className="text-xs font-semibold text-slate-300">ABC Technology Ltd.</p>

                  {/* Skills Matched Badges */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">React</span>
                    <span className="rounded bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-300">TypeScript</span>
                    <span className="rounded bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-300">Next.js</span>
                    <span className="rounded bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-300">Tailwind</span>
                  </div>

                  {/* View Job Action Buttons */}
                  <div className="mt-3.5 flex gap-2">
                    <Link
                      href="/jobs"
                      className="flex-1 rounded-lg border border-blue-500/40 bg-blue-500/10 py-2 text-center text-xs font-bold text-blue-400 transition-colors hover:bg-blue-500/20"
                    >
                      View Job
                    </Link>
                    <Link
                      href="/jobs"
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-blue-500 shadow-md shadow-blue-600/20"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
