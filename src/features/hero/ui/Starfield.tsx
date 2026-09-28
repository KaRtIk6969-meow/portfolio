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

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = !document.hidden;
    let width = 0;
    let height = 0;

    // Handle high DPI screens capped at 2x for optimal battery and GPU performance
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Cosmic design token color options
    const starColors = ["#8B5CF6", "#06B6D4", "#F3F4F6", "#A78BFA", "#38BDF8"];

    // Pre-render star sprites for each color for zero-overhead GPU blitting
    const spriteCanvases: Record<string, HTMLCanvasElement> = {};
    const spriteSize = 32;

    starColors.forEach((color) => {
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = spriteSize;
      spriteCanvas.height = spriteSize;
      const sCtx = spriteCanvas.getContext("2d");
      if (sCtx) {
        const center = spriteSize / 2;
        // Outer halo
        sCtx.beginPath();
        sCtx.arc(center, center, center * 0.9, 0, Math.PI * 2);
        sCtx.fillStyle = color;
        sCtx.globalAlpha = 0.22;
        sCtx.fill();

        // Inner core
        sCtx.beginPath();
        sCtx.arc(center, center, center * 0.45, 0, Math.PI * 2);
        sCtx.fillStyle = color;
        sCtx.globalAlpha = 0.95;
        sCtx.fill();
      }
      spriteCanvases[color] = spriteCanvas;
    });

    // Populate particles star array
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
    let pendingMouseX = 0;
    let pendingMouseY = 0;
    let hasPendingMouse = false;

    // Passive mouse tracker decoupling high polling rates from RAF tick
    const handleMouseMove = (event: MouseEvent) => {
      pendingMouseX = event.clientX;
      pendingMouseY = event.clientY;
      hasPendingMouse = true;
    };

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resizeCanvas();
    };

    const speed = 0.45;

    const animate = () => {
      if (!isVisible) return;

      // Ingest mouse coordinates once per render frame
      if (hasPendingMouse) {
        targetMouseX = (pendingMouseX - width / 2) * 0.06;
        targetMouseY = (pendingMouseY - height / 2) * 0.06;
        hasPendingMouse = false;
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
          const projectedRadius = Math.min(star.size * k * 1.8, 6);
          const sprite = spriteCanvases[star.color];
          if (sprite) {
            ctx.drawImage(
              sprite,
              px - projectedRadius,
              py - projectedRadius,
              projectedRadius * 2,
              projectedRadius * 2
            );
          }
        }
      }

      if (isVisible) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isScrolledPastHero = false;

    const updateAnimationState = () => {
      if (prefersReducedMotion) return;
      const shouldRun = !document.hidden && !isScrolledPastHero;
      if (shouldRun !== isVisible) {
        isVisible = shouldRun;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      }
    };

    const handleScroll = () => {
      const past = window.scrollY > window.innerHeight * 1.3;
      if (past !== isScrolledPastHero) {
        isScrolledPastHero = past;
        updateAnimationState();
      }
    };

    const handleVisibilityChange = () => {
      updateAnimationState();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial ignition: single frame for reduced-motion, continuous RAF otherwise
    if (prefersReducedMotion) {
      animate();
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transform-gpu"
      style={{ contain: "strict" }}
      aria-hidden="true"
    />
  );
}
