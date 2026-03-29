'use client';

import { useEffect, useRef } from 'react';

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate random constellation points
    const points: Array<{ x: number; y: number; opacity: number; pulse: number }> = [];
    const pointCount = Math.min(50, Math.floor(window.innerWidth / 50));

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 2,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;

      // Draw connecting lines
      ctx.strokeStyle = `rgba(99, 102, 241, 0.1)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.globalAlpha = 0.1 * (1 - distance / 200);
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw points with pulsing effect
      points.forEach((point) => {
        const pulse = Math.sin(frameCount * 0.02 + point.pulse) * 0.3 + 0.7;
        const size = 2 * pulse;

        // Outer glow
        ctx.fillStyle = `rgba(99, 102, 241, ${point.opacity * 0.3 * pulse})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner point
        ctx.fillStyle = `rgba(99, 102, 241, ${point.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
    />
  );
}
