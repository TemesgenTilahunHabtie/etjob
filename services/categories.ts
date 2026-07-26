import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/types";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  jobCount?: number;
}

type CategoryViewRow = Database["public"]["Views"]["category_job_counts"]["Row"];

const FALLBACK_CATEGORIES: CategoryData[] = [
  { id: "cat-1", name: "Software Engineering", slug: "software-engineering", icon: "💻", jobCount: 142 },
  { id: "cat-2", name: "Design & Creative", slug: "design-creative", icon: "🎨", jobCount: 52 },
  { id: "cat-3", name: "Marketing", slug: "marketing", icon: "🚀", jobCount: 64 },
  { id: "cat-4", name: "Finance", slug: "finance", icon: "📈", jobCount: 86 },
  { id: "cat-5", name: "Sales", slug: "sales", icon: "💼", jobCount: 91 },
  { id: "cat-6", name: "Customer Support", slug: "customer-support", icon: "🎧", jobCount: 39 },
  { id: "cat-7", name: "Healthcare", slug: "healthcare", icon: "🏥", jobCount: 45 },
  { id: "cat-8", name: "Education", slug: "education", icon: "🎓", jobCount: 28 },
  { id: "cat-9", name: "Engineering", slug: "engineering", icon: "⚙️", jobCount: 78 },
  { id: "cat-10", name: "Remote Jobs", slug: "remote-jobs", icon: "🌐", jobCount: 115 },
];

/**
 * Data Access Service: Categories
 * Queries Supabase `category_job_counts` view with fallback to static mock categories.
 */
export async function getCategories(): Promise<CategoryData[]> {
  try {
    const { data, error } = await supabase
      .from("category_job_counts")
      .select("*")
      .order("category_name", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    return (data as CategoryViewRow[]).map((cat) => ({
      id: cat.category_id,
      name: cat.category_name,
      slug: cat.category_slug,
      icon: cat.category_icon || "📁",
      description: cat.category_description || undefined,
      jobCount: cat.open_job_count || 0,
    }));
  } catch {
    return FALLBACK_CATEGORIES;
  }
}
