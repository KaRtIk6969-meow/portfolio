"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Handle high DPI screens smoothly capped at 2x
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Cosmic design token color options
    const starColors = ["#8B5CF6", "#06B6D4", "#F3F4F6", "#A78BFA", "#38BDF8"];

    // Populate particles star arrays
    const starCount = 140;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.4 + 0.6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - width / 2) * 0.06;
      targetMouseY = (event.clientY - height / 2) * 0.06;
    };

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resizeCanvas();
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const speed = 0.45;

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Smooth canvas trail clear with cosmic void background
      ctx.fillStyle = "rgba(3, 7, 18, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinates tracking with damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // 3D perspective projection factor
        const k = 128.0 / star.z;
        const px = star.x * k + width / 2 + mouseX;
        const py = star.y * k + height / 2 + mouseY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const projectedSize = Math.min(star.size * k, 3.2);

          // Layered celestial glow without GPU-killing shadowBlur
          // Outer halo (celestial ambient glow)
          ctx.beginPath();
          ctx.arc(px, py, projectedSize * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = 0.18;
          ctx.fill();

          // Bright star core
          ctx.beginPath();
          ctx.arc(px, py, projectedSize, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = 0.9;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ willChange: "transform" }}
    />
  );
}
