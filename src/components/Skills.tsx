import { Code, Brain, Settings } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL/NoSQL"],
      delay: "0s"
    },
    {
      icon: Brain,
      title: "AI & Data",
      skills: ["Machine Learning", "NLP", "Prompt Engineering", "SEO AI tools"],
      delay: "0.2s"
    },
    {
      icon: Settings,
      title: "Management",
      skills: ["Agile/Scrum", "Roadmap Planning", "Product Strategy"],
      delay: "0.4s"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="bg-gradient-primary bg-clip-text text-transparent">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with strategic thinking to deliver comprehensive solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index} 
                className="card-gradient p-8 rounded-2xl shadow-card hover-lift group animate-slide-up"
                style={{ animationDelay: category.delay }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="px-4 py-2 bg-muted/30 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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