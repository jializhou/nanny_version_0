export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          profile_image: string | null
          user_type: 'employer' | 'caregiver'
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name: string
          email: string
          profile_image?: string | null
          user_type: 'employer' | 'caregiver'
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          profile_image?: string | null
          user_type?: 'employer' | 'caregiver'
          created_at?: string | null
          updated_at?: string | null
        }
      }
      caregivers: {
        Row: {
          id: string
          profile_id: string
          city: string
          hometown: string | null
          age: number
          specialty: string | null
          monthly_salary: number
          experience_years: number | null
          bio: string | null
          short_bio: string | null
          skills: string[] | null
          certifications: string[] | null
          start_time: string | null
          available: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          city: string
          hometown?: string | null
          age: number
          specialty?: string | null
          monthly_salary: number
          experience_years?: number | null
          bio?: string | null
          short_bio?: string | null
          skills?: string[] | null
          certifications?: string[] | null
          start_time?: string | null
          available?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          city?: string
          hometown?: string | null
          age?: number
          specialty?: string | null
          monthly_salary?: number
          experience_years?: number | null
          bio?: string | null
          short_bio?: string | null
          skills?: string[] | null
          certifications?: string[] | null
          start_time?: string | null
          available?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          caregiver_id: string
          reviewer_id: string
          rating: number
          text: string
          helpful_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          caregiver_id: string
          reviewer_id: string
          rating: number
          text: string
          helpful_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          caregiver_id?: string
          reviewer_id?: string
          rating?: number
          text?: string
          helpful_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          content: string
          read: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          content: string
          read?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          content?: string
          read?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}