import { supabase, Project, ProjectInsert, ProjectUpdate } from '@/lib/supabase'

export class ProjectService {
  // Get all projects
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }

    return data || []
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured projects:', error)
      throw error
    }

    return data || []
  }

  // Get project by ID
  static async getProject(id: number): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      throw error
    }

    return data
  }

  // Create new project
  static async createProject(project: ProjectInsert): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      throw error
    }

    return data
  }

  // Update project
  static async updateProject(id: number, updates: ProjectUpdate): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      throw error
    }

    return data
  }

  // Delete project
  static async deleteProject(id: number): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }

  // Upload project image
  static async uploadImage(file: File, projectId: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${projectId}-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(`projects/${fileName}`, file)

    if (error) {
      console.error('Error uploading image:', error)
      throw error
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(`projects/${fileName}`)

    return urlData.publicUrl
  }

  // Delete image
  static async deleteImage(imagePath: string): Promise<void> {
    // Extract path from full URL
    const path = imagePath.split('/').slice(-2).join('/')
    
    const { error } = await supabase.storage
      .from('project-images')
      .remove([path])

    if (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}