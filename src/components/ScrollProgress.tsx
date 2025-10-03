import { useEffect, useState } from "react";

/**
 * Elite scroll progress bar component
 * Shows user's reading progress through the page
 */
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollableHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-[100]"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%] transition-all duration-200 ease-out shadow-glow animate-shimmer"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Milestone indicators */}
      <div className="fixed top-4 right-4 z-[100] hidden lg:block">
        <div className="flex flex-col gap-2">
          {[
            { threshold: 0, label: 'Top', id: 'home' },
            { threshold: 25, label: 'About', id: 'about' },
            { threshold: 50, label: 'Projects', id: 'projects' },
            { threshold: 75, label: 'Skills', id: 'skills' },
            { threshold: 90, label: 'Contact', id: 'contact' }
          ].map((milestone) => (
            <button
              key={milestone.id}
              onClick={() => {
                const element = document.getElementById(milestone.id === 'home' ? 'root' : milestone.id);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-150 ${
                scrollProgress >= milestone.threshold
                  ? 'bg-primary shadow-gold'
                  : 'bg-muted/40 hover:bg-primary/50'
              }`}
              aria-label={`Jump to ${milestone.label}`}
              title={milestone.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;
