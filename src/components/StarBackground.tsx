import React, { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      targetAlpha: number;
      twinkleSpeed: number;
      originalX: number;
      originalY: number;
    }

    let stars: Star[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      if (!canvas) return;
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Increased density
      
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedMultiplier = Math.random() * 0.2 + 0.05; // Slower base movement
        
        stars.push({
          x,
          y,
          originalX: x, // Store original position for drift return? No, let's just use current.
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (Math.random() - 0.5) * speedMultiplier,
          alpha: Math.random(),
          targetAlpha: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const drawStars = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      stars.forEach((star) => {
        // Update alpha (twinkle)
        const alphaDiff = star.targetAlpha - star.alpha;
        star.alpha += alphaDiff * star.twinkleSpeed;
        
        if (Math.abs(alphaDiff) < 0.01) {
          star.targetAlpha = Math.random() * 0.8 + 0.1;
        }

        // Mouse Interaction (Parallax / subtle attraction)
        // Calculate distance to mouse
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200; // Interaction radius

        let moveX = star.vx;
        let moveY = star.vy;

        if (distance < maxDist) {
            // Subtle repulsion/movement away from cursor
            const force = (maxDist - distance) / maxDist;
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 2; // Push strength
            const pushY = Math.sin(angle) * force * 2;
            
            // Move star slightly away
            star.x -= pushX;
            star.y -= pushY;
        }

        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position (base drift)
        star.x += moveX;
        star.y += moveY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation loop
    const loop = () => {
        drawStars();
        // animationFrameId is set inside drawStars
    };
    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
