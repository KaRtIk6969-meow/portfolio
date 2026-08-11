# Deep Space Developer Portfolio Design System, Tokens, Layout Rules, and Component Registry

This document is the single source of truth for every interface, interaction, and component. Every design decision should reinforce clarity, consistency, and trust.

---

# Part 1: Core Principles & Golden Rules

## Simplicity
Design should reveal only what the user needs in the current moment. Hide unnecessary complexity, reduce cognitive load, and guide users one decision at a time without sacrificing power.

## Fluidity
Every interaction should feel connected. Elements should transform naturally instead of appearing or disappearing abruptly, helping users always understand where they came from and where they are going.

## Consistency
Users should never have to relearn the interface. Similar actions, layouts, and components should always behave in predictable ways.

## Accessibility
Accessibility is a design requirement, not a feature. Every interface should be usable by as many people as possible regardless of ability or device.

---

## Golden Rules
Every design should:
* Focus on one primary action.
* Reveal complexity progressively.
* Reuse existing components.
* Preserve user context.
* Explain changes through motion.
* Prioritize readability.

---

# Part 2: Design Tokens

Never hardcode colors, spacing, typography, radius values, or shadows. Always use these design tokens:

## Design Personality

The application should feel:
Cosmic, cinematic, futuristic, immersive, and premium

The UI should feel like a spaceship control interface mapping cosmic data paths rather than a generic software dashboard.

## Colors

### Brand & Accent Colors
* **Primary Accent** (`colors.primary`): `#8B5CF6` (Vibrant Violet / Purple)
* **Secondary Accent** (`colors.secondary`): `#06B6D4` (Electric Cyan)
* **Background Surface** (`colors.surface-main`): `#030712` (Very dark grey / black)
* **Elevated Surface** (`colors.surface-elevated`): `#0B0F19` (Elevated dark blue/grey)
* **Text Primary** (`colors.text-primary`): `#F3F4F6` (Cool white)
* **Text Secondary** (`colors.text-secondary`): `#9CA3AF` (Muted grey)
* **Border Color** (`colors.border-line`): `#1F2937` (Dark grey border)
* **Semantic Danger** (`colors.semantic-danger`): `#EF4444` (Vibrant red)
* **Semantic Success** (`colors.semantic-success`): `#10B981` (Vibrant emerald green)

## Typography

### Font Family
* **Primary Font**: `Inter`
* **Fallback Font**: `sans-serif`
* **Monospace Font**: `Fira Code`

## Spacing Scale (8px Grid)
* XS: `4px`
* SM: `8px`
* MD: `16px`
* LG: `24px`
* XL: `32px`
* 2XL: `48px`
* 3XL: `64px`

## Shadows & Elevation
* **Level 1 (Card)**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
* **Level 2 (Floating)**: `0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
* **Level 3 (Modal)**: `0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

## Border Radius
* **Sharp/Strict**: `4px`
* **Standard Cards**: `12px`
* **Pills/Circles**: `9999px`

---

# Part 3: Visual Styling & Layout Rules

These rules define how every screen should be designed. If a UI decision conflicts with this section, these rules win:

## Design Principles
* **Visual Language**: The interface should feel celestial, dark, glassmorphic, and high contrast. Visual design should support content instead of competing with it.
* **Layout Structure**: Screens must follow a predictable hierarchy: standard navigation header, main vertical scroll stream with clear sections, footer contact area.
* **Typography Hierarchy**: Use weight and strict token usage to carry hierarchy on body copy. Tighten line-heights on display sizes and keep it generous on body copy.
* **Empty State Rules**: Every empty state must display an SVG icon, clear text message, and primary call to action button.
* **Prohibited Layout Styles**: light themes, unstyled buttons, generic colors, emojis in UI, and layout shifts.

## Layout & Grid
* **Whitespace Philosophy**: generous spacing to establish a cinematic pace

---

# Part 4: UI Component Registry

Always use these component structures. Duplicate component declarations are not allowed:

## Buttons
* **`button-primary`**: Background `colors.primary`, text on-primary, rounded to match radius tokens.
* **`button-secondary`**: Background transparent/surface, bordered, text `colors.primary`.
* **`button-danger`**: Used exclusively for destructive actions.
* **`button-glow`**: Neon glowing border with transition hover effects.

## Cards
* **`primary-card`**: Background `colors.surface-elevated`, padded with `spacing.lg`.
* **`glass-card`**: Semi transparent background with backdrop blur filter.

## Inputs
* **`text-input`**: Standard input field with consistent border radius and clear focus rings.
* **`textarea-input`**: Multi line input box with custom scrollbars.

## Layout Containers
* **`screen-container`**: Root layout wrapper providing maximum constraints and margin padding.
* **`section-wrapper`**: Padded spacer element grouping related components.

---

# Part 5: Responsive Behavior & Breakpoints

## Breakpoints Matrix
* **Desktop-XL (1440px)**: Default desktop layout.
* **Tablet (960px)**: Columns collapse, navigation transitions to overlay menus.
* **Mobile (768px)**: Full bleed containers, touch targets strictly 44px minimum.

## Do's and Don'ts
* **DO**: Use CSS hardware acceleration triggers on interactive animations.
* **DO**: Include clear keyboard focus styles for accessibility.
* **DON'T**: Avoid layout modifications inside animations to prevent performance lag.
* **DON'T**: Do not use standard emojis.
* **DON'T**: Never hardcode custom hex codes directly in standard styles.
