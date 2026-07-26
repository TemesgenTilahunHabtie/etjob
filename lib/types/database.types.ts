export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = "candidate" | "employer" | "admin"
export type ExperienceLevelType = "entry" | "mid" | "senior" | "lead" | "executive"
export type EmploymentTypeEnum = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance"
export type JobStatusEnum = "draft" | "active" | "paused" | "closed" | "expired"
export type ApplicationStatusEnum = "submitted" | "under_review" | "shortlisted" | "interviewing" | "offered" | "rejected" | "withdrawn"
export type CompanyMemberRole = "owner" | "admin" | "recruiter" | "hr_manager"
export type NotificationTypeEnum = "job_match" | "application_status" | "system_alert"

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      candidate_profiles: {
        Row: {
          id: string
          user_id: string
          headline: string | null
          bio: string | null
          location: string | null
          years_experience: number
          resume_url: string | null
          profile_completion: number
          embedding: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          headline?: string | null
          bio?: string | null
          location?: string | null
          years_experience?: number
          resume_url?: string | null
          profile_completion?: number
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          headline?: string | null
          bio?: string | null
          location?: string | null
          years_experience?: number
          resume_url?: string | null
          profile_completion?: number
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          created_at?: string
        }
        Relationships: []
      }
      candidate_skills: {
        Row: {
          id: string
          candidate_id: string
          skill_id: string
          experience_level: ExperienceLevelType
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          skill_id: string
          experience_level?: ExperienceLevelType
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          skill_id?: string
          experience_level?: ExperienceLevelType
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          }
        ]
      }
      job_preferences: {
        Row: {
          id: string
          candidate_id: string
          preferred_locations: Json
          preferred_job_types: Json
          salary_expectation: number
          remote_preference: boolean
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          preferred_locations?: Json
          preferred_job_types?: Json
          salary_expectation?: number
          remote_preference?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          preferred_locations?: Json
          preferred_job_types?: Json
          salary_expectation?: number
          remote_preference?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_preferences_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          logo_url: string | null
          description: string | null
          industry: string | null
          location: string | null
          website: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          logo_url?: string | null
          description?: string | null
          industry?: string | null
          location?: string | null
          website?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          description?: string | null
          industry?: string | null
          location?: string | null
          website?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      company_members: {
        Row: {
          id: string
          company_id: string
          user_id: string
          role: CompanyMemberRole
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          role?: CompanyMemberRole
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          role?: CompanyMemberRole
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      job_categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          category_id: string
          title: string
          description: string
          location: string
          employment_type: EmploymentTypeEnum
          salary_min: number | null
          salary_max: number | null
          experience_level: ExperienceLevelType
          remote: boolean
          status: JobStatusEnum
          featured: boolean
          views_count: number
          application_count: number
          embedding: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          category_id: string
          title: string
          description: string
          location: string
          employment_type?: EmploymentTypeEnum
          salary_min?: number | null
          salary_max?: number | null
          experience_level?: ExperienceLevelType
          remote?: boolean
          status?: JobStatusEnum
          featured?: boolean
          views_count?: number
          application_count?: number
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          category_id?: string
          title?: string
          description?: string
          location?: string
          employment_type?: EmploymentTypeEnum
          salary_min?: number | null
          salary_max?: number | null
          experience_level?: ExperienceLevelType
          remote?: boolean
          status?: JobStatusEnum
          featured?: boolean
          views_count?: number
          application_count?: number
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      job_skills: {
        Row: {
          id: string
          job_id: string
          skill_id: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          skill_id: string
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          skill_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          }
        ]
      }
      applications: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          status: ApplicationStatusEnum
          cover_letter: string | null
          match_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          status?: ApplicationStatusEnum
          cover_letter?: string | null
          match_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          status?: ApplicationStatusEnum
          cover_letter?: string | null
          match_score?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_jobs: {
        Row: {
          id: string
          candidate_id: string
          job_id: string
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          job_id: string
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          job_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      telegram_connections: {
        Row: {
          id: string
          user_id: string
          telegram_id: string | null
          username: string | null
          connected: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          telegram_id?: string | null
          username?: string | null
          connected?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          telegram_id?: string | null
          username?: string | null
          connected?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          job_id: string | null
          type: NotificationTypeEnum
          message: string
          sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id?: string | null
          type?: NotificationTypeEnum
          message: string
          sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string | null
          type?: NotificationTypeEnum
          message?: string
          sent?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      category_job_counts: {
        Row: {
          category_id: string
          category_name: string
          category_slug: string
          category_icon: string | null
          category_description: string | null
          open_job_count: number
        }
        Relationships: []
      }
    }
    Functions: {}
    Enums: {
      user_role: UserRole
      experience_level_type: ExperienceLevelType
      employment_type_enum: EmploymentTypeEnum
      job_status_enum: JobStatusEnum
      application_status_enum: ApplicationStatusEnum
      company_member_role: CompanyMemberRole
      notification_type_enum: NotificationTypeEnum
    }
  }
}
