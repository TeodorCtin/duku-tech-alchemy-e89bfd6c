import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const Projects = () => {
  const revealRef = useScrollReveal();
  const staggerRef = useStaggeredReveal(150);

  const projects = [
    {
      title: "Joben",
      description: "A job board dedicated to white-collar roles, offering sourcing and online job promotion.",
      role: "Founder & Full Stack Developer",
      tech: ["WordPress", "PHP", "MySQL", "Custom APIs"],
    },
    {
      title: "DiveIn",
      description: "A project focused on digital engagement and AI-driven user experiences.",
      role: "AI Engineer & Product Manager", 
      tech: ["React", "Node.js", "Python", "OpenAI API"],
    },
    {
      title: "EDA Dent (AI SEO Collaboration)",
      description: "Integrating AI into SEO strategies for dental clinics.",
      role: "AI Engineer & Consultant",
      tech: ["Python", "NLP", "SEO Automation Tools"],
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text-animated">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of technology, AI, and business through impactful digital solutions.
          </p>
        </div>
        
        <div ref={staggerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="card-gradient border-border hover-lift hover-glow group stagger-item magnetic"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-all duration-500 group-hover:scale-105">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-primary font-medium group-hover:text-primary/80 transition-colors">
                  {project.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;