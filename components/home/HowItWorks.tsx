"use client";

import { useState } from "react";
import Link from "next/link";

interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSpecialAccent?: boolean;
}

const JOB_SEEKER_STEPS: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "Create Your Profile",
    description: "Add your skills, experience, and CV.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    stepNumber: "02",
    title: "Set Your Preferences",
    description: "Choose your desired roles, locations, salary, and work style.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5M13.5 12h6.75m-6.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H10.5" />
      </svg>
    ),
  },
  {
    stepNumber: "03",
    title: "Get Smart Telegram Alerts",
    description: "Receive personalized opportunities automatically.",
    isSpecialAccent: true,
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.45-.02.07-.02.16-.04.28z" />
      </svg>
    ),
  },
  {
    stepNumber: "04",
    title: "Apply & Get Hired",
    description: "Review matches and submit applications.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13h4.25m-2.13-4.13a14.962 14.962 0 012.7-2.7" />
      </svg>
    ),
  },
];

const EMPLOYER_STEPS: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "Create Company Profile",
    description: "Build a trusted company presence and showcase your culture.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5s0 0 0 0m0 3h-1.5s0 0 0 0m0 3h1.5s0 0 0 0m0 3h-1.5s0 0 0 0m3-9h1.5s0 0 0 0m0 3h-1.5s0 0 0 0m0 3h1.5s0 0 0 0m0 3h-1.5s0 0 0 0" />
      </svg>
    ),
  },
  {
    stepNumber: "02",
    title: "Post Your Job Vacancy",
    description: "Publish detailed requirements to reach top candidates.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    stepNumber: "03",
    title: "Receive Qualified Candidates",
    description: "Our algorithm matches your post to pre-filtered applicants.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a5.97 5.97 0 00-.942 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    stepNumber: "04",
    title: "Hire the Right Person Faster",
    description: "Review candidate profiles, shortlist top talent, and hire.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

/**
 * HowItWorks Component
 * 
 * Purpose:
 * Landing page section detailing the 4-step workflow for both Job Seekers and Employers.
 * Demonstrates how ETJob provides proactive job matching alongside Telegram bot alerts.
 */
export default function HowItWorks() {
  const [activeRole, setActiveRole] = useState<"seeker" | "employer">("seeker");

  const activeSteps = activeRole === "seeker" ? JOB_SEEKER_STEPS : EMPLOYER_STEPS;

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            How ETJob Works
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            From Search to Successful Hiring
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Whether you are looking for your next opportunity or searching for talent, ETJob simplifies the entire process.
          </p>
        </div>

        {/* Role Toggle Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setActiveRole("seeker")}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                activeRole === "seeker"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("employer")}
              className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                activeRole === "employer"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Workflow Steps Grid */}
        <div className="relative mt-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {activeSteps.map((step, idx) => (
              <div key={step.stepNumber} className="relative flex flex-col">
                
                {/* Connecting Arrow on Desktop between steps */}
                {idx < activeSteps.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-1/2 -z-0 hidden -translate-y-1/2 translate-x-1/2 text-slate-300 lg:block dark:text-slate-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}

                {/* Step Card Container */}
                <div
                  className={`group relative flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    step.isSpecialAccent
                      ? "border-blue-500/30 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl shadow-blue-500/20"
                      : "border-slate-200/90 bg-white shadow-sm hover:border-blue-300 hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
                  }`}
                >
                  <div>
                    {/* Top Header: Icon & Step Number */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold shadow-xs transition-colors ${
                          step.isSpecialAccent
                            ? "bg-white/20 text-white backdrop-blur"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div className="flex flex-col items-end">
                        <span
                          className={`text-2xl font-black ${
                            step.isSpecialAccent
                              ? "text-blue-200/80"
                              : "text-slate-200 group-hover:text-blue-200 dark:text-slate-800 dark:group-hover:text-blue-900"
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        {step.isSpecialAccent && (
                          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-extrabold text-white backdrop-blur">
                            24/7 Matching Assistant
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3
                      className={`mt-5 text-base font-bold ${
                        step.isSpecialAccent ? "text-white" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        step.isSpecialAccent ? "text-blue-100" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Card Bottom Indicator Line */}
                  <div
                    className={`mt-6 h-1 w-10 rounded-full transition-all group-hover:w-full ${
                      step.isSpecialAccent
                        ? "bg-white/40 group-hover:bg-white"
                        : "bg-slate-100 group-hover:bg-blue-600 dark:bg-slate-800 dark:group-hover:bg-blue-500"
                    }`}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Conversion Panel */}
        <div className="mt-14 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
            
            {/* For Job Seekers CTA */}
            <div className="flex flex-col items-start justify-between gap-4 pr-0 md:pr-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  For Job Seekers
                </span>
                <h4 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
                  Start finding opportunities automatically
                </h4>
              </div>
              <Link
                href="/telegram/connect"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                <span>Connect Telegram Assistant</span>
                <span>→</span>
              </Link>
            </div>

            {/* For Employers CTA */}
            <div className="flex flex-col items-start justify-between gap-4 pl-0 pt-6 md:pl-6 md:pt-0 border-t border-slate-200 md:border-t-0 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  For Employers
                </span>
                <h4 className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
                  Find qualified candidates faster
                </h4>
              </div>
              <Link
                href="/jobs/new"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
              >
                <span>Post a Job</span>
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
