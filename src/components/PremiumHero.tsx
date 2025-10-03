import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { useTypingEffect, usePrefersReducedMotion } from "@/hooks/useEliteEffects";

const PremiumHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Typing animation for dynamic text
  const typingTexts = [
    "technology, AI & business",
    "innovation & scalability",
    "user experience & design",
    "code & creativity"
  ];
  const typedText = useTypingEffect(typingTexts, 100, 50, 2000);

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
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Gold Gradient Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Premium Glassmorphism Card */}
      <div 
        className="relative z-10 w-full flex justify-center"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Floating Gold Stars */}
        <div className="absolute -top-20 left-10 animate-float">
          <Star className="w-6 h-6 text-primary fill-primary opacity-60" />
        </div>
        <div className="absolute -top-10 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-primary opacity-60" />
        </div>
        <div className="absolute top-40 -left-10 animate-float" style={{ animationDelay: '2s' }}>
          <Star className="w-5 h-5 text-primary fill-primary opacity-40" />
        </div>

        <div className="max-w-6xl w-full px-6 text-center">

        {/* Premium Badge */}
        <div className="mb-4 md:mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-primary/20 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Full Stack Developer & AI Engineer</span>
          </div>
        </div>

        {/* Main Heading with Typing Animation */}
        <h1 
          className="text-3xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-8 leading-tight animate-fade-in font-montserrat"
          style={{ animationDelay: '0.2s' }}
        >
          Building digital products{" "}
          <br />
          <span className="text-foreground/90">at the intersection of</span>
          <br />
          <span className="gradient-text-animated inline-block min-h-[1.2em] relative">
            {prefersReducedMotion ? "technology, AI & business" : (
              <>
                {typedText}
                <span className="typing-cursor">|</span>
              </>
            )}
          </span>
        </h1>
        
        {/* Subtitle with Glassmorphism */}
        <div 
          className="max-w-4xl mx-auto mb-6 md:mb-12 p-3 md:p-8 rounded-xl md:rounded-3xl bg-black/30 backdrop-blur-xl border border-primary/10 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <p className="text-base md:text-xl lg:text-2xl text-foreground/80 leading-relaxed font-light text-center">
            Full Stack Web Developer | AI Engineer | Product & Project Manager
          </p>
          <p className="text-sm md:text-lg text-primary/70 mt-1 md:mt-4 font-medium text-center">
            Creating scalable solutions and impactful digital experiences
          </p>
        </div>
        
        {/* Premium CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-fade-in items-center px-4"
          style={{ animationDelay: '1s' }}
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-7 text-base md:text-lg font-semibold button-premium glow-effect bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 text-black shadow-gold-strong group"
            onClick={() => scrollToSection('projects')}
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-7 text-base md:text-lg font-semibold border-2 border-primary bg-primary/5 text-primary hover:bg-primary/15 backdrop-blur-xl button-premium hover:border-primary hover:shadow-gold group"
            onClick={() => scrollToSection('contact')}
          >
            <span className="relative z-10">Get in Touch</span>
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
          </Button>
        </div>
        </div>

      </div>

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  );
};

export default PremiumHero;
