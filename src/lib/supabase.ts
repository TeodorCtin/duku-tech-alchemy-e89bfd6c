import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Project {
  id?: number
  title: string
  description: string
  image: string
  tech: string[]
  github?: string
  demo?: string
  featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface ProjectInsert extends Omit<Project, 'id' | 'created_at' | 'updated_at'> {}
export interface ProjectUpdate extends Partial<ProjectInsert> {}