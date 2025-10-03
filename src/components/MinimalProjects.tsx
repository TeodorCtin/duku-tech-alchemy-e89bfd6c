import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MinimalProjects = () => {
  const projects = [
    {
      title: "Joben",
      description: "A job board dedicated to white-collar roles, offering sourcing and online job promotion.",
      role: "Founder, Full Stack Developer & AI Engineer",
      tech: ["WordPress", "PHP", "MySQL", "Custom APIs"],
      link: "https://joben.eu",
    },
    {
      title: "DiveIn",
      description: "A project focused on professional development of a local community.",
      role: "Founder, Team Leader & Product Manager", 
      tech: ["React", "Node.js", "Python", "OpenAI API"],
      link: "https://divein.ro",
    },
    {
      title: "EDA Dent",
      description: "Integrating AI into SEO strategies for dental clinics.",
      role: "AI Engineer & Consultant",
      tech: ["Python", "NLP", "SEO Automation Tools"],
      link: "https://edadent.ro",
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background" aria-labelledby="projects-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="projects-heading" className="text-2xl font-semibold mb-8 text-foreground">
            Projects
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-white border border-border hover:shadow-sm transition-shadow duration-200"
              role="article"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-foreground">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-muted-foreground transition-colors"
                  >
                    {project.title}
                  </a>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {project.role}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-muted text-muted-foreground border-0"
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

export default MinimalProjects;