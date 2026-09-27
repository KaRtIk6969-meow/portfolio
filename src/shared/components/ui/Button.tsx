"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  glow = false,
  icon,
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Base styling tokens
  const baseClasses =
    "group relative inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

  // Size tokens
  const sizeClasses = {
    sm: "px-4 py-2 text-xs rounded-full gap-1.5",
    md: "px-6 py-3 text-sm rounded-full gap-2",
    lg: "px-8 py-4 text-sm sm:text-base rounded-full gap-2.5",
  }[size];

  // Variant tokens
  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover text-text-primary shadow-glow-violet hover:scale-[1.03] active:scale-[0.98]",
    secondary:
      "bg-surface-elevated/80 hover:bg-surface-hover text-text-primary border border-border-line hover:border-secondary/60 hover:shadow-glow-cyan active:scale-[0.98]",
    outline:
      "bg-transparent text-secondary border border-secondary/40 hover:border-secondary hover:bg-secondary/10 hover:shadow-glow-cyan active:scale-[0.98]",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 active:scale-[0.98]",
  }[variant];

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={magnetic ? { x: position.x, y: position.y } : undefined}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      style={{ willChange: "transform" }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {/* Optional cosmic glowing border ring */}
      {glow && (
        <span className="absolute inset-0 rounded-full border border-secondary/30 group-hover:border-secondary group-hover:scale-105 transition-all duration-300 pointer-events-none" />
      )}

      {children}

      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
