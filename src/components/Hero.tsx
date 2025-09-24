import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50 
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-transform duration-700 ease-out"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `translateY(${scrollY * 0.5}px) translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full float-animation" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary/10 rounded-full float-animation" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/30 rounded-full float-animation" />
      
      {/* Content with Enhanced Animations */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            animationDelay: '0.2s'
          }}
        >
          Building digital products at the{" "}
          <span className="gradient-text-animated">
            intersection
          </span>{" "}
          of technology, AI, and business.
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in"
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: '0.6s'
          }}
        >
          Full Stack Web Developer | AI Engineer | Product & Project Manager
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold button-premium glow-effect"
            onClick={() => scrollToSection('projects')}
          >
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground button-premium"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </Button>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center transition-all duration-300 hover:border-primary/80 hover:scale-110 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;