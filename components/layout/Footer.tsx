import Link from "next/link";

/**
 * Global Footer Component
 * 
 * Purpose:
 * Renders the global site footer across all ETJob pages.
 * Highlights ETJob's AI job assistant differentiator, dual-audience navigation (Job Seekers & Employers),
 * legal pages, and official social media channels.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Ambient Background Decorative Blur Gradients */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Section: Brand Overview & Telegram CTA Banner Card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start lg:col-span-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-extrabold text-white shadow-md shadow-blue-500/25">
                ET
              </span>
              <span>
                ET<span className="text-blue-500">Job</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-slate-400 max-w-md leading-relaxed">
              Find the right opportunities faster with AI-powered job matching and instant Telegram alerts.
            </p>
          </div>

          {/* Telegram Assistant Prominent CTA Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 p-5 sm:p-6 shadow-xl backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <span>⚡ Telegram Job Assistant</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">
                Never Miss the Right Opportunity Again
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                Let ETJob Assistant monitor jobs that match your skills and notify you instantly.
              </p>

              <div className="mt-4">
                <Link
                  href="/telegram/connect"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all hover:bg-blue-500 active:scale-[0.98]"
                >
                  <span>Connect Telegram Assistant</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Section: Footer Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 py-12 border-b border-slate-800">
          
          {/* Column 1: Job Seekers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Job Seekers</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/jobs" className="transition-colors hover:text-blue-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/categories" className="transition-colors hover:text-blue-400">
                  Job Categories
                </Link>
              </li>
              <li>
                <Link href="/companies" className="transition-colors hover:text-blue-400">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/telegram/connect" className="transition-colors hover:text-blue-400">
                  Telegram Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Employers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Employers</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/jobs/new" className="transition-colors hover:text-blue-400 font-semibold text-blue-400">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employers" className="transition-colors hover:text-blue-400">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/employers" className="transition-colors hover:text-blue-400">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span>Pricing</span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="transition-colors hover:text-blue-400">
                  About ETJob
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Social Channels */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© 2026 ETJob. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400">
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ETJob Telegram"
              className="transition-colors hover:text-blue-400"
            >
              <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ETJob LinkedIn"
              className="transition-colors hover:text-blue-400"
            >
              <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ETJob Facebook"
              className="transition-colors hover:text-blue-400"
            >
              <svg className="h-5 w-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
