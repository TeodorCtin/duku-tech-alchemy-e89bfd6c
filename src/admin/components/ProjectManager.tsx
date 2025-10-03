import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, ExternalLink, Star } from "lucide-react";
import projectsData from "../data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  tech: string[];
  link: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...projectData, updatedAt: new Date().toISOString() }
          : p
      );
      setProjects(updatedProjects);
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: projectData.title || "",
        description: projectData.description || "",
        role: projectData.role || "",
        tech: projectData.tech || [],
        link: projectData.link || "",
        status: projectData.status || "draft",
        featured: projectData.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProjects([...projects, newProject]);
    }
    
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const ProjectForm = ({ project }: { project?: Project }) => {
    const [formData, setFormData] = useState({
      title: project?.title || "",
      description: project?.description || "",
      role: project?.role || "",
      tech: project?.tech.join(", ") || "",
      link: project?.link || "",
      status: project?.status || "draft",
      featured: project?.featured || false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSaveProject({
        ...formData,
        tech: formData.tech.split(",").map(t => t.trim()).filter(Boolean)
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Project title"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Project description"
            rows={3}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Role</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            placeholder="Your role in the project"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Technologies (comma-separated)</label>
          <Input
            value={formData.tech}
            onChange={(e) => setFormData({...formData, tech: e.target.value})}
            placeholder="React, Node.js, Python, etc."
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Project Link</label>
          <Input
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            placeholder="https://example.com"
            type="url"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            />
            <label htmlFor="featured" className="text-sm font-medium">Featured</label>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {project ? "Update Project" : "Create Project"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm project={editingProject || undefined} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="relative hover:shadow-md transition-shadow">
            {project.featured && (
              <div className="absolute top-3 right-3">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge variant={project.status === "published" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-primary font-medium">{project.role}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingProject(project);
                    setIsDialogOpen(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                
                {project.link && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;