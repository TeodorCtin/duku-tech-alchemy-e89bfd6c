const MinimalSkills = () => {
  const skillCategories = [
    {
      title: "Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL/NoSQL"],
    },
    {
      title: "AI & Data",
      skills: ["Machine Learning", "NLP", "Prompt Engineering", "SEO AI tools"],
    },
    {
      title: "Management",
      skills: ["Agile/Scrum", "Roadmap Planning", "Product Strategy"],
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Skills
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-medium mb-4 text-foreground">
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="text-sm text-muted-foreground py-1"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalSkills;