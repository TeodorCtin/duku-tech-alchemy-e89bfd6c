import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";
import { useFeaturedProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const revealRef = useScrollReveal();
  const staggerRef = useStaggeredReveal(150);
  const { data: projects, isLoading, error } = useFeaturedProjects();

  // Use projects from database or fallback data if none exist
  const fallbackProjects = [
    {
      title: "Joben",
      description: "A job board dedicated to white-collar roles, offering sourcing and online job promotion.",
      tech: ["WordPress", "PHP", "MySQL", "Custom APIs"],
      demo: "https://joben.eu",
    },
    {
      title: "DiveIn", 
      description: "A project focused on professional development of a local community.",
      tech: ["React", "Node.js", "Python", "OpenAI API"],
      demo: "https://divein.ro",
    },
    {
      title: "EDA Dent",
      description: "Integrating AI into SEO strategies for dental clinics.",
      tech: ["Python", "NLP", "SEO Automation Tools"],
      demo: "https://edadent.ro",
    },
    {
      title: "ThinkUp",
      description: "A comprehensive platform for strategic thinking and project management.",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      demo: "https://thinkup.ro",
    }
  ];

  const displayProjects = projects?.length ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-12 md:py-20 section-premium" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div ref={revealRef} className="text-center mb-16 animate-reveal">
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured <span className="gradient-text-animated">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of technology, AI, and business through impactful digital solutions.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="card-premium">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-18" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Failed to load projects. Using fallback data.</p>
          </div>
        ) : null}

        <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProjects.map((project, index) => (
            <Card 
              key={project.id || index} 
              className="card-premium hover-lift group stagger-item"
              role="article"
              aria-label={`Project: ${project.title}`}
            >
              {project.image && (
                <div className="overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-all duration-500 group-hover:scale-105">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;