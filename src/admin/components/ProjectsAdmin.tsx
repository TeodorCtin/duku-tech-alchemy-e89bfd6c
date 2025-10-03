import { useState } from "react";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useProjects";
import { Project, ProjectInsert } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Plus, ExternalLink, Github } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  tech: string;
  github: string;
  demo: string;
  featured: boolean;
}

const ProjectsAdmin = () => {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    image: "",
    tech: "",
    github: "",
    demo: "",
    featured: false,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      tech: "",
      github: "",
      demo: "",
      featured: false,
    });
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    const projectData: ProjectInsert = {
      title: formData.title,
      description: formData.description,
      image: formData.image || "",
      tech: formData.tech.split(",").map(t => t.trim()).filter(Boolean),
      github: formData.github || undefined,
      demo: formData.demo || undefined,
      featured: formData.featured,
    };

    try {
      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id!, updates: projectData });
      } else {
        await createProject.mutateAsync(projectData);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || "",
      tech: project.tech.join(", "),
      github: project.github || "",
      demo: project.demo || "",
      featured: project.featured || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
            Projects Management
          </h2>
          <p className="text-muted-foreground mt-1">Create, edit, and manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-glass-bg backdrop-blur-sm border border-glass-border">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
                {editingProject ? "✏️ Edit Project" : "✨ Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-foreground">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter your project title..."
                  className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-foreground">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project in detail..."
                  rows={4}
                  className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-semibold text-foreground">
                    🖼️ Image URL
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tech" className="text-sm font-semibold text-foreground">
                    🛠️ Technologies
                  </Label>
                  <Input
                    id="tech"
                    value={formData.tech}
                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Separate with commas</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github" className="text-sm font-semibold text-foreground">
                    🔗 GitHub URL
                  </Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="demo" className="text-sm font-semibold text-foreground">
                    🚀 Demo URL
                  </Label>
                  <Input
                    id="demo"
                    value={formData.demo}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    placeholder="https://project-demo.com"
                    className="bg-background border border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 bg-glass-bg backdrop-blur-sm rounded-2xl border border-primary/20 shadow-card">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <div>
                  <Label htmlFor="featured" className="text-sm font-semibold cursor-pointer">
                    ⭐ Featured Project
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Featured projects appear prominently on your portfolio
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-glass-border">
                <Button 
                  type="submit" 
                  disabled={createProject.isPending || updateProject.isPending}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  {createProject.isPending || updateProject.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingProject ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {editingProject ? "✏️ Update Project" : "✨ Create Project"}
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-muted/10 hover:border-primary/30 text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects && projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-glass-bg backdrop-blur-sm rounded-lg p-8 border border-dashed border-glass-border">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Start by creating your first project to showcase your work.</p>
            <Button 
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
          <Card key={project.id} className="group relative overflow-hidden hover:shadow-elevated transition-smooth hover:-translate-y-3 bg-glass-bg backdrop-blur-sm border border-glass-border shadow-card">
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-smooth"></div>
            
            {project.featured && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-gradient-primary text-primary-foreground border-0 shadow-glow px-3 py-1 rounded-xl">
                  ⭐ Featured
                </Badge>
              </div>
            )}
            
            <div className="relative">
              {project.image ? (
                <div className="overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm rounded-t-lg flex items-center justify-center border-b border-glass-border">
                  <div className="text-5xl opacity-50">🚀</div>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-card/80 backdrop-blur-sm border border-primary/20 text-foreground px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-muted/80 backdrop-blur-sm border border-muted-foreground/20 text-muted-foreground px-3 py-1 rounded-lg">
                      +{project.tech.length - 4}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      className="bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-smooth px-4 py-2"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id!)}
                      className="bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-smooth px-4 py-2"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {project.demo && (
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="bg-glass-bg backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-smooth p-2 rounded-xl"
                        title="View Demo"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    
                    {project.github && (
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="bg-glass-bg backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-smooth p-2 rounded-xl"
                        title="View GitHub"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;