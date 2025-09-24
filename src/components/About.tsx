const About = () => {
  return (
    <section id="about" className="py-20 bg-section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          
          <div className="card-gradient p-8 rounded-2xl shadow-card hover-lift max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I design and develop web platforms, engineer AI-driven solutions, and manage products from idea to execution. 
              My focus is on creating tools and experiences that bring real impact — from scalable job boards to AI-powered SEO.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;