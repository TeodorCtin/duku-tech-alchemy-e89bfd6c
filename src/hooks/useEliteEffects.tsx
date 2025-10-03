import { useEffect, useState } from "react";

/**
 * Elite typing animation hook for hero headlines
 */
export const useTypingEffect = (texts: string[], typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }
      } else {
        if (displayText.length === currentText.length) {
          setIsPaused(true);
        } else {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }
      }
    }, isPaused ? delayBetween : isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, delayBetween]);

  return displayText;
};

/**
 * Hook for detecting user's motion preferences
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook for cursor trail effect (premium UX)
 */
export const useCursorTrail = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const trail: { x: number; y: number; element: HTMLDivElement }[] = [];
    const trailLength = 20;

    const handleMouseMove = (e: MouseEvent) => {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);

      trail.push({ x: e.clientX, y: e.clientY, element: dot });

      if (trail.length > trailLength) {
        const old = trail.shift();
        old?.element.remove();
      }

      setTimeout(() => {
        dot.remove();
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      trail.forEach(item => item.element.remove());
    };
  }, [enabled]);
};
