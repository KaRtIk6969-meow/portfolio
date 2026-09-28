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

### Bug 005: Orphaned Last Letter 'R' and Oversized Hero Typography
- **Symptom**: The final character 'R' in "ALEX MERCER" broke onto a new line centered alone, and the font size was excessively huge (`lg:text-9xl`).
- **Root Cause**: Characters were split individually as raw `inline-block` spans (`name.split("")`) without word grouping, combined with an oversized font scale that exceeded the container's max width.
- **Verified Fix Pattern**: Scaled font down to `text-4xl sm:text-6xl md:text-7xl font-black leading-tight`, and nested character animations inside word containers (`name.split(" ")`) with `inline-block whitespace-nowrap` so words never split across lines.

### Bug 006: Mobile Horizontal Overflow and Timeline Node Clipping
- **Symptom**: On narrow viewports (320px–375px), horizontal scrollbars appeared on the Skills section, the Contact email address overflowed the card boundary, and the About timeline line/dots clipped against the left viewport edge.
- **Root Cause**: Skills category tabs lacked horizontal scroll containment (`overflow-x-auto`), long email strings lacked line breaking, and the About timeline margin (`ml-4 sm:ml-12 md:ml-28`) was too narrow for the 48px circle offset.
- **Verified Fix Pattern**: Added `overflow-x-auto scrollbar-none` with responsive button padding to Skills filter bar, applied `break-all sm:break-normal` to email text, adjusted timeline margin to `ml-6 sm:ml-12 md:ml-28` with `pl-6 sm:pl-8`, and standardized section padding to `py-16 sm:py-24`.

### Bug 007: Scroll Stutter and GPU Compositing Overhead from Layout Thrashing and Nested Backdrop Filters
- **Symptom**: Scrolling jitter, micro-stutter, and elevated GPU/CPU usage during fast user scrolling and mouse movement.
- **Root Cause**:
  1. `Navbar.tsx` polled `element.offsetTop` and `scrollHeight` across 5 section elements every scroll tick, causing forced synchronous layout reflows on the browser main thread.
  2. Nested `backdrop-filter: blur(16px)` on card parents combined with `backdrop-blur-md` on inner chips forced continuous multi-pass rasterization on top of the 60fps moving background canvas.
  3. `Starfield.tsx` continued requesting `requestAnimationFrame` when the document was hidden, and mousemove listeners computed math on high-frequency raw events (up to 1000Hz).
  4. Hero scroll cue used an infinite JavaScript Framer Motion loop instead of an off-thread compositor animation.
  5. Interactive cards used broad `transition-all` which triggered style recomputations on hover.
- **Verified Fix Pattern**:
  1. Replaced `Navbar.tsx` scroll-spy with zero-reflow `IntersectionObserver` (`rootMargin: "-15% 0px -40% 0px"`) and passive boolean scroll check.
  2. Calibrated `.glass-panel` to `blur(12px)` and opacity `0.82`, removed nested backdrop filters from inner chips, and added `content-visibility: auto` (`contain-intrinsic-size: auto 600px`) to offscreen sections.
  3. Paused `Starfield` RAF loop completely when `document.hidden`, decoupled mousemove ingestion to 1 read per frame, and added `transform-gpu` with `contain: strict`.
  4. Offloaded Hero scroll bounce to GPU compositor via pure CSS `@keyframes bounce-subtle`.
  5. Swapped `transition-all` with targeted `transition-[transform,box-shadow,border-color]` on interactive cards.

