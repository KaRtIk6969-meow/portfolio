"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { smoothScrollTo } from "@/shared/utils/scroll";

const navItems = [
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["hero", "projects", "skills", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (id === "hero" && window.scrollY < 400) {
          setActiveSection("hero");
          break;
        }
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === "hero") {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      smoothScrollTo(id, -20);
    }
  };

  return (
    <>
      {/* Floating navigation pill header */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto max-w-4xl w-full h-14 rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 shadow-floating ${
            scrolled
              ? "bg-surface-elevated/85 backdrop-blur-xl border-border-line/80 shadow-glow-cyan/10"
              : "bg-surface-elevated/65 backdrop-blur-lg border-border-line/50"
          }`}
        >
          {/* Logo brand with active pulse node */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full py-1 px-2 -ml-2 transition-all"
            aria-label="Back to top"
          >
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-surface-main border border-border-line group-hover:border-secondary transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse" />
            </div>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-text-primary font-bold group-hover:text-secondary transition-colors">
              COSMOS
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary ${
                    isActive
                      ? "text-text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-surface-hover/90 border border-secondary/40 rounded-full shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right quick action + mobile toggle */}
          <div className="flex items-center gap-2.5">
            {/* Status pill on tablet & desktop */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-main/80 border border-border-line text-[10px] font-mono text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-semantic-success animate-pulse" />
              <span className="tracking-wide">AVAILABLE</span>
            </div>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 bg-primary/20 hover:bg-primary text-secondary hover:text-white border border-secondary/40 hover:border-transparent rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer shadow-sm hover:shadow-glow-violet"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-surface-main/80 border border-border-line text-text-secondary hover:text-text-primary hover:border-secondary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 inset-x-4 z-40 md:hidden bg-surface-elevated/95 backdrop-blur-2xl border border-border-line/80 rounded-2xl p-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-border-line/60">
                <span className="text-[11px] font-mono text-secondary tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  NAVIGATION
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-semantic-success animate-pulse" />
                  AVAILABLE FOR HIRE
                </span>
              </div>

              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-mono text-xs tracking-wider text-left transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary/20 text-white border border-secondary/30 font-bold"
                        : "text-text-secondary hover:text-white hover:bg-surface-hover/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-text-muted">#{item.id}</span>
                  </button>
                );
              })}

              <div className="pt-2 mt-1 border-t border-border-line/60">
                <button
                  onClick={() => handleNavClick("contact")}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-sans font-bold text-xs tracking-wide transition-all shadow-glow-violet cursor-pointer"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
