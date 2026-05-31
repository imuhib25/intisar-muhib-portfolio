import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Store dimensions in a mutable object to avoid TS closure narrowing issues
    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const resizeCanvas = () => {
      dimensions.width = window.innerWidth;
      dimensions.height = window.innerHeight;
      if (canvasRef.current) {
        canvasRef.current.width = dimensions.width;
        canvasRef.current.height = dimensions.height;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      color: string = '';

      constructor() {
        this.reset();
        // Distribute particles across canvas initially
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
      }

      reset() {
        this.x = Math.random() * dimensions.width;
        this.y = dimensions.height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = -(Math.random() * 0.8 + 0.2); // upward movement
        
        // Indigo and violet colors with low opacity
        const colors = [
          'rgba(79, 70, 229, 0.15)', // Indigo
          'rgba(147, 51, 234, 0.15)', // Violet
          'rgba(6, 182, 212, 0.1)',  // Cyan
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < -10 || this.x < -10 || this.x > dimensions.width + 10) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 20000));
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Add a subtle background glow
      const gradient = ctx.createRadialGradient(
        dimensions.width / 2, dimensions.height / 2, 0,
        dimensions.width / 2, dimensions.height / 2, Math.max(dimensions.width, dimensions.height)
      );
      gradient.addColorStop(0, '#040216');
      gradient.addColorStop(1, '#02000a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw interactive connections (constellations) if particles are close
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
};
