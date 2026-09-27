# Error & Architectural Memory Tracking

## Purpose
Tracks architectural bugs, performance bottlenecks, root causes, and verified fix patterns across the Deep Space Developer Portfolio codebase.

---

### Bug 001: Mobile Navbar Links Inaccessible
- **Symptom**: On mobile viewports (< 640px), navigation links completely disappeared, leaving no way for mobile users to navigate between sections.
- **Root Cause**: `page.tsx` contained inline navigation with `hidden sm:flex` and lacked any mobile menu trigger or drawer.
- **Verified Fix Pattern**: Extract navigation into a dedicated `Navbar.tsx` component with an animated mobile hamburger drawer using Framer Motion `AnimatePresence`.

### Bug 002: Canvas Performance Degradation from `ctx.shadowBlur`
- **Symptom**: Scrolling jitter and frame drops during user interaction.
- **Root Cause**: In `Starfield.tsx`, setting `ctx.shadowBlur = 8` inside the rendering loop for 150 particles triggered costly software canvas raster repaints every frame (16.6ms budget exceeded).
- **Verified Fix Pattern**: Replace repetitive `ctx.shadowBlur` with radial alpha gradients / layered arc rendering or offscreen caching, and pause the RAF loop when the canvas is scrolled out of view.

### Bug 003: Smooth Scroll Conflicts Between Native `scrollIntoView` and Lenis
- **Symptom**: Micro-stutter and competing scroll animations when clicking anchor links.
- **Root Cause**: Using native `element.scrollIntoView({ behavior: "smooth" })` concurrently while Lenis smooth scroll engine controls the window scroll position.
- **Verified Fix Pattern**: Route link clicks through a unified scroll utility that dispatches to Lenis's `lenis.scrollTo()` with custom easing.

### Bug 004: Missing Outer Scope Canvas Dimensions in `Starfield.tsx`
- **Symptom**: TypeScript build failure with `error TS2304: Cannot find name 'width'` and `'height'`.
- **Root Cause**: `width` and `height` were re-assigned inside `resizeCanvas()` without declaring them in the outer `useEffect` closure scope.
- **Verified Fix Pattern**: Declare `let width = 0; let height = 0;` at the top of the canvas hook closure before inner functions.
