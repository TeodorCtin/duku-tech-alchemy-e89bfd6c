import { Button } from "@/components/ui/button";

const MinimalHero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Clean Typography */}
        <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground leading-tight">
          Duku Constantin
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
          Full Stack Developer & AI Engineer
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Building digital products at the intersection of technology, AI, and business.
        </p>
        
        {/* Minimal CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            View Projects
          </Button>
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 border-muted-foreground/20 hover:bg-muted"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MinimalHero;