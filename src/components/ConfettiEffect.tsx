import { useEffect } from "react";

/**
 * Elite confetti effect for celebrations
 */
export const triggerConfetti = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FF6B6B', '#4ECDC4'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
};

/**
 * Confetti component with CSS animations
 */
const ConfettiEffect = () => {
  useEffect(() => {
    // Add confetti styles
    const style = document.createElement('style');
    style.textContent = `
      .confetti-piece {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        z-index: 10000;
        animation: confetti 3s ease-out forwards;
        pointer-events: none;
      }
      
      @keyframes confetti {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

export default ConfettiEffect;
