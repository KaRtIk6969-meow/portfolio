# Deep Space Cosmic Portfolio Master Motion Spec

This document defines the overarching interaction universe and animation design system for the Deep Space Developer Portfolio.

---

## 1. Global Settings

* **Motion Tier**: Tier 2 Premium Motion
* **Easing Language**: Celestial, smooth, heavy, and deliberate
* **Scroll Behavior**: Lenis smooth scroll for inertial scroll feeling
* **Page Transitions**: Standard Next.js route transitions with Framer Motion fade triggers
* **Signature Interaction**: Custom glowing celestial mouse trail and magnetic button hover attraction

---

## 2. Animation Philosophy: 3 Pillars

1. **Intentionality**: Every animation has a reason. It reveals hierarchy, guides attention, or confirms interaction.
2. **Narrative Coherence**: Animations tell a story. The page enters with purpose, content reveals in a logical sequence, and interactions feel like natural cause and effect.
3. **Performance Integrity**: Premium feel requires 60fps. GPU accelerated only. Main thread blocking is a hard failure.

---

## 3. Per Page Animation Assignments

### Hero Section
* **Type**: Starfield Particle Canvas + Text Stagger Reveal
* **Description**: A canvas particle field of moving stars reacts to mouse moves. Display typography reveals character by character.
* **Trigger**: Page load
* **Easing**: ease reveal (cubic-bezier(0.22, 1, 0.36, 1))

### Projects Section
* **Type**: Staggered Card Entrance + Interactive Hover Transforms
* **Description**: Cards fade up and scale on scroll entry. Hovering on a card tilts it slightly, showing neon glow boundaries.
* **Trigger**: Scroll enter
* **Easing**: ease primary (cubic-bezier(0.16, 1, 0.3, 1))

### Skills Section
* **Type**: Category Tab Switch Transition
* **Description**: Switching skill categories triggers dynamic grid layout morphing. Hovering on a skill badge scales it and enhances its cyan shadow.
* **Trigger**: User click / hover
* **Easing**: ease primary (cubic-bezier(0.16, 1, 0.3, 1))

### About Section
* **Type**: Scroll Revealed Timeline
* **Description**: Timeline nodes reveal chronologically as they scroll into view. The line draws itself on scroll.
* **Trigger**: Scroll enter
* **Easing**: ease primary (cubic-bezier(0.16, 1, 0.3, 1))

### Contact Section
* **Type**: Focus State Neon Glows
* **Description**: Input fields expand their glow borders on focus. Submit button triggers loading spinner transition.
* **Trigger**: User focus / form submit
* **Easing**: ease primary (cubic-bezier(0.16, 1, 0.3, 1))

---

## 4. Easing Curves

* **ease-primary** (GSAP power4.out / cubic-bezier(0.16, 1, 0.3, 1)): Used for section reveals, card entrances, and hover responses.
* **ease-reveal** (GSAP power3.out / cubic-bezier(0.22, 1, 0.36, 1)): Used for hero titles and initial page loading text splits.
* **ease-transition** (GSAP power2.inOut / cubic-bezier(0.65, 0, 0.35, 1)): Used for general transitions.

---

## 5. Implementation Rules

* **DO**: Use Framer Motion layout transitions for morphing grids to avoid performance lag.
* **DO**: Use CSS hardware acceleration triggers like translate3d for stars and card tilts.
* **DO**: Set `will-change` on animating elements to prevent main thread blocking.
* **DON'T**: Forbid modifying `width`, `height`, or positioning offsets like `top` and `left` inside active animations.
* **DON'T**: Forbid emojis in the UI. Emojis break the premium cosmic aesthetic.
