import { Code, Brain, Settings } from "lucide-react";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const Skills = () => {
  const revealRef = useScrollReveal();
  const staggerRef = useStaggeredReveal(200);

  const skillCategories = [
    {
      icon: Code,
      title: "Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL/NoSQL"],
    },
    {
      icon: Brain,
      title: "AI & Data",
      skills: ["Machine Learning", "NLP", "Prompt Engineering", "AI Agents", "Process Automation", "Make.com", "n8n", "APIs Integration"],
    },
    {
      icon: Settings,
      title: "Management",
      skills: ["Leadership", "Team Coordination", "Strategic Planning", "Problem Solving", "Communication", "Project Management"],
    }
  ];

  return (
    <section id="skills" className="py-12 md:py-20 section-premium">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={revealRef} className="text-center mb-16 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Skills & <span className="gradient-text-animated">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with strategic thinking to deliver comprehensive solutions.
          </p>
        </div>
        
        <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index} 
                className="card-premium p-8 rounded-2xl hover-lift group stagger-item"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4 group-hover:text-primary transition-all duration-500">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="px-4 py-2 bg-muted/30 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default hover:scale-105 hover:shadow-lg"
                      style={{ 
                        transitionDelay: `${skillIndex * 50}ms`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;