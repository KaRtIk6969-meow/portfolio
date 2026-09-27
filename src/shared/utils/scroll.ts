/**
 * Unified Smooth Scrolling Utility
 * Routes scroll requests to Lenis inertial scroll engine if initialized,
 * with reliable fallback to native smooth scrolling.
 */
export function smoothScrollTo(targetIdOrSelector: string, offset: number = 0) {
  if (typeof window === "undefined") return;

  const cleanId = targetIdOrSelector.replace(/^#/, "");
  const target = document.getElementById(cleanId) || document.querySelector(targetIdOrSelector);

  if (!target) return;

  // Check for global Lenis instance
  const win = window as unknown as { __lenis?: { scrollTo: (target: Element, options?: object) => void } };

  if (win.__lenis && typeof win.__lenis.scrollTo === "function") {
    win.__lenis.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const yOffset = offset;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
