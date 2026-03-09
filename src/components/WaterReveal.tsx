import React, { useEffect, useRef, useState } from 'react';

interface WaterRevealProps {
  children: React.ReactNode;
  trigger: boolean; // Starts the "settling" animation
  onComplete?: () => void;
}

const WaterReveal: React.FC<WaterRevealProps> = ({ children, trigger, onComplete }) => {
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const [isAnimating, setIsAnimating] = useState(true); // Always active initially (distorted)

  useEffect(() => {
    if (trigger && displacementRef.current) {
      let start: number;
      const duration = 2000; // 2 seconds to settle
      const initialScale = 100; // High distortion

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentScale = initialScale * (1 - easeProgress);

        if (displacementRef.current) {
          displacementRef.current.scale.baseVal = currentScale;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setIsAnimating(false);
          if (onComplete) onComplete();
        }
      };

      requestAnimationFrame(step);
    }
  }, [trigger, onComplete]);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="water-reveal-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.02" 
              numOctaves="3" 
              result="noise" 
            />
            <feDisplacementMap 
              ref={displacementRef}
              in="SourceGraphic" 
              in2="noise" 
              scale="100" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
      <div 
        style={{ 
          filter: isAnimating ? 'url(#water-reveal-filter)' : 'none',
          width: '100%',
          minHeight: '100vh',
          // Ensure it takes full space
        }}
      >
        {children}
      </div>
    </>
  );
};

export default WaterReveal;
