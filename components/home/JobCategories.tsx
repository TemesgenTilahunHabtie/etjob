import Link from "next/link";

interface JobCategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  jobCount?: number;
}

/**
 * Seed data array for career categories.
 * Architectural Note: Structured to map 1:1 with upcoming Supabase `categories` table.
 * `supabase.from('categories').select('*').order('job_count', { ascending: false })`
 */
const JOB_CATEGORIES: JobCategoryItem[] = [
  {
    id: "cat-1",
    name: "Technology",
    slug: "technology",
    icon: "💻",
    description: "Software, IT, Data & Engineering",
    jobCount: 142,
  },
  {
    id: "cat-2",
    name: "Finance",
    slug: "finance",
    icon: "📈",
    description: "Accounting, Banking & Financial Analysis",
    jobCount: 86,
  },
  {
    id: "cat-3",
    name: "Marketing",
    slug: "marketing",
    icon: "🚀",
    description: "Digital Growth, SEO & Content Strategy",
    jobCount: 64,
  },
  {
    id: "cat-4",
    name: "Design",
    slug: "design",
    icon: "🎨",
    description: "UI/UX, Product & Visual Design",
    jobCount: 52,
  },
  {
    id: "cat-5",
    name: "Engineering",
    slug: "engineering",
    icon: "⚙️",
    description: "Civil, Mechanical & Electrical Engineering",
    jobCount: 78,
  },
  {
    id: "cat-6",
    name: "Healthcare",
    slug: "healthcare",
    icon: "🏥",
    description: "Medical Services, Nursing & Public Health",
    jobCount: 45,
  },
  {
    id: "cat-7",
    name: "Sales",
    slug: "sales",
    icon: "💼",
    description: "Account Management & Business Development",
    jobCount: 91,
  },
  {
    id: "cat-8",
    name: "Customer Service",
    slug: "customer-service",
    icon: "🎧",
    description: "Client Support, Operations & Helpdesk",
    jobCount: 39,
  },
];

/**
 * JobCategories Component
 * 
 * Purpose:
 * Renders career category cards helping users discover opportunities by industry.
 * Positioned on the landing page between Featured Jobs and How ETJob Works.
 */
export default function JobCategories() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            Explore Categories
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Find Jobs By Category
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
            Browse opportunities across different industries and career paths.
          </p>
        </div>

        {/* Categories Responsive Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOB_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/jobs?category=${category.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:group-hover:bg-blue-600">
                    {category.icon}
                  </div>
                  {category.jobCount !== undefined && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {category.jobCount} Jobs
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                <span>Explore Role</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Primary CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 active:scale-[0.98]"
          >
            <span>View All Categories</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
