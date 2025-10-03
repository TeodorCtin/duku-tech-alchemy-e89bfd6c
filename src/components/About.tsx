const About = () => {

  return (
    <section id="about" className="py-12 md:py-20 section-premium" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="card-premium p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              I design and develop web platforms, engineer AI-driven solutions, and manage products from idea to execution. 
              My focus is on creating tools and experiences that bring real impact — from scalable job boards to AI-powered SEO.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed">
              With expertise spanning full-stack development, artificial intelligence, and product management, 
              I bridge the gap between technical excellence and business strategy. I thrive in environments where 
              innovation meets execution, and I'm passionate about building products that scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;