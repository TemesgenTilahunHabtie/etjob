"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createManagedJob } from "@/services/jobManagement";
import { EmploymentTypeEnum, ExperienceLevelType } from "@/lib/types";

export default function NewJobPostingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categorySlug: "software-engineering",
    location: "",
    employmentType: "Full-time" as EmploymentTypeEnum,
    experienceLevel: "mid" as ExperienceLevelType,
    salaryMin: "",
    salaryMax: "",
    remote: false,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Hardcoded demo company / category fallback for demo context
    const result = await createManagedJob({
      companyId: "00000000-0000-0000-0000-000000000001",
      categoryId: "00000000-0000-0000-0000-000000000002",
      title: formData.title,
      description: formData.description,
      location: formData.location,
      employmentType: formData.employmentType,
      experienceLevel: formData.experienceLevel,
      salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
      salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
      remote: formData.remote,
      status: "active",
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/jobs"), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post a New Job</h1>
        <p className="mt-1 text-sm text-slate-500">Publish your job opportunity on ETJob Marketplace.</p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
            Job created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Full Stack Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
              <input
                type="text"
                required
                placeholder="e.g. Addis Ababa, Ethiopia"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as EmploymentTypeEnum })}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Min Salary ($)</label>
              <input
                type="number"
                placeholder="e.g. 2000"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Max Salary ($)</label>
              <input
                type="number"
                placeholder="e.g. 4000"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remote"
              checked={formData.remote}
              onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <label htmlFor="remote" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              This is a Remote position
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Job Description</label>
            <textarea
              required
              rows={5}
              placeholder="Describe the responsibilities and requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Publishing Job..." : "Publish Job Posting"}
          </button>
        </form>
      </div>
    </div>
  );
}
