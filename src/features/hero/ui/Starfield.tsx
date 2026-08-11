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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cosmic design token color options
    const starColors = ["#8B5CF6", "#06B6D4", "#F3F4F6", "#3B82F6", "#a78bfa"];

    // Populate particles star arrays
    const starCount = 150;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - width / 2) * 0.08;
      targetMouseY = (event.clientY - height / 2) * 0.08;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const speed = 0.5;

    const animate = () => {
      // Clear canvas with opacity trail effect
      ctx.fillStyle = "rgba(3, 7, 18, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinates tracking with damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      stars.forEach((star) => {
        // Star movement in z depth coordinate
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Transform coordinates with 3D projection factors
        const k = 128.0 / star.z;
        const px = star.x * k + width / 2 + mouseX;
        const py = star.y * k + height / 2 + mouseY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const projectedSize = star.size * k;
          ctx.beginPath();
          ctx.arc(px, py, Math.min(projectedSize, 3), 0, Math.PI * 2);
          ctx.fillStyle = star.color;

          // Glowing shadow properties for celestial effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;

          ctx.fill();
        }
      });

      // Reset shadow configs to prevent leakage
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
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
