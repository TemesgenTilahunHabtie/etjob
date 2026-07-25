"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Global Navbar Component
 * 
 * Purpose:
 * Provides sticky, accessible navigation across all ETJob pages.
 * 
 * Architectural & Future Integration Notes:
 * - Currently renders unauthenticated navigation links (Jobs, Companies, About, Sign In, Sign Up, Post a Job).
 * - Future Supabase Authentication:
 *   Will consume an auth context/hook (`useAuth()`) listening to Supabase Auth state.
 * - Future Role-Based Navigation:
 *   - Job Seeker: Saved Jobs, Applications, Profile, Telegram Alert preferences.
 *   - Employer: Post a Job CTA, Employer Dashboard, Applicants management.
 *   - Admin: Moderation console & company verification links.
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Micro-Label */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-extrabold text-white shadow-md shadow-blue-500/25">
              ET
            </span>
            <div className="flex items-center gap-2">
              <span>
                ET<span className="text-blue-600 dark:text-blue-400">Job</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-blue-200/80 bg-blue-50/80 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                Smart Job Matching
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Main Navigation">
            <Link
              href="/jobs"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100/60 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-blue-400"
            >
              Jobs
            </Link>
            <Link
              href="/companies"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100/60 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-blue-400"
            >
              Companies
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100/60 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-blue-400"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {/* Primary Employer Action CTA */}
          <Link
            href="/jobs/new"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            <span>Post a Job</span>
            <span className="text-blue-200">→</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

          {/* Authentication Actions */}
          <Link
            href="/login"
            className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-blue-400"
          >
            Sign In
          </Link>
          
          <Link
            href="/register"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 active:scale-[0.98]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white/95 px-4 pb-6 pt-4 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-950/95" id="mobile-menu">
          <nav className="flex flex-col gap-2">
            <Link
              href="/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              Jobs
            </Link>
            <Link
              href="/companies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              Companies
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              About
            </Link>

            <Link
              href="/jobs/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20"
            >
              <span>Post a Job</span>
              <span>→</span>
            </Link>

            <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
            
            <div className="flex gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
