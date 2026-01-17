import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  speedX: number;
  speedY: number;
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 2500);
      starsRef.current = [];
      
      for (let i = 0; i < starCount; i++) {
        // Random direction for each star - creates galaxy rotation feel
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.3 + 0.1;
        
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with slight trail effect for smooth movement
      ctx.fillStyle = 'rgba(13, 13, 17, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and move stars
      starsRef.current.forEach((star) => {
        // Update position - floating through space
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Wrap around edges for infinite space effect
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;
        
        // Draw star with glow effect
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(200, 200, 255, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw bright core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    
    // Initial clear fill
    ctx.fillStyle = '#0d0d11';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
