"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

/**
 * JobCard Component
 * 
 * Purpose:
 * Reusable presentational card component for displaying individual job postings.
 * Used across the Featured Jobs landing section and main `/jobs` search listing pages.
 * 
 * Architectural & Future Integration Notes:
 * - Bookmark UI Button:
 *   Currently manages local client UI toggle state (`isSaved`).
 *   Future integration will bind `onClick` to Supabase RLS (`saved_jobs` table: `user_id`, `job_id`, `created_at`).
 * - Card Navigation:
 *   Utilizes stretched link overlay pattern pointing to `/jobs/[id]`, leading to the
 *   dynamic job details page where applicants can submit applications to the `applications` table.
 */
export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
      <div>
        {/* Top Header: Company Avatar, Match Badge & Bookmark Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {job.companyLogo ? (
              <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                {job.companyName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.companyName}</h4>
              <span className="text-[11px] font-medium text-slate-400">{job.createdAt}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Match Percentage Badge */}
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
              ⚡ 94% Match
            </span>
            
            {/* Bookmark / Save Job UI Button */}
            <button
              type="button"
              onClick={toggleSave}
              aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
              className="relative z-10 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
          {job.title}
        </h3>

        {/* Meta Info Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/80 px-2.5 py-1 font-medium dark:bg-slate-800">
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/80 px-2.5 py-1 font-medium dark:bg-slate-800">
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {job.workplaceType} • {job.employmentType}
          </span>
        </div>

        {/* Skills Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Salary & Primary View Job CTA */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Salary</span>
          <p className="text-xs font-extrabold text-slate-900 dark:text-white">
            {job.salaryRange || "Competitive"}
          </p>
        </div>

        {/* Stretched Link on Primary CTA */}
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
        >
          <span className="absolute inset-0" aria-hidden="true" />
          <span>View Job</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}
