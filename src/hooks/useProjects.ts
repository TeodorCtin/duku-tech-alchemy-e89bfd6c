import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProjectService } from '@/services/projectService'
import { Project, ProjectInsert, ProjectUpdate } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  featured: ['projects', 'featured'] as const,
  byId: (id: number) => ['projects', id] as const,
}

// Get all projects
export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: ProjectService.getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get featured projects
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: projectKeys.featured,
    queryFn: ProjectService.getFeaturedProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get project by ID
export const useProject = (id: number) => {
  return useQuery({
    queryKey: projectKeys.byId(id),
    queryFn: () => ProjectService.getProject(id),
    enabled: !!id,
  })
}

// Create project mutation
export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: ProjectInsert) => ProjectService.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: projectKeys.featured })
      toast({
        title: 'Success',
        description: 'Project created successfully!',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      })
      console.error('Create project error:', error)
    },
  })
}

// Update project mutation
export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: ProjectUpdate }) =>
      ProjectService.updateProject(id, updates),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: projectKeys.featured })
      queryClient.setQueryData(projectKeys.byId(updatedProject.id!), updatedProject)
      toast({
        title: 'Success',
        description: 'Project updated successfully!',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      })
      console.error('Update project error:', error)
    },
  })
}

// Delete project mutation
export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => ProjectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: projectKeys.featured })
      toast({
        title: 'Success',
        description: 'Project deleted successfully!',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      })
      console.error('Delete project error:', error)
    },
  })
}

// Upload image mutation
export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ file, projectId }: { file: File; projectId: string }) =>
      ProjectService.uploadImage(file, projectId),
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      })
      console.error('Upload image error:', error)
    },
  })
}