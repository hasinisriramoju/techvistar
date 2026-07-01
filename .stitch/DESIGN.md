---
name: Vistra Precision
colors:
  surface: '#121315'
  surface-dim: '#121315'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#c1c6d6'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303032'
  outline: '#8b919f'
  outline-variant: '#414753'
  surface-tint: '#abc7ff'
  primary: '#abc7ff'
  on-primary: '#002f66'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#005cbb'
  secondary: '#cbbeff'
  on-secondary: '#332760'
  secondary-container: '#4a3e78'
  on-secondary-container: '#baacee'
  tertiary: '#b9c9d5'
  on-tertiary: '#23323c'
  tertiary-container: '#677681'
  on-tertiary-container: '#fafcff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#cbbeff'
  on-secondary-fixed: '#1e104a'
  on-secondary-fixed-variant: '#4a3e78'
  tertiary-fixed: '#d5e5f1'
  tertiary-fixed-dim: '#b9c9d5'
  on-tertiary-fixed: '#0e1d26'
  on-tertiary-fixed-variant: '#3a4953'
  background: '#121315'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
  surface-charcoal: '#121417'
  border-subtle: '#2A2D32'
  electric-teal: '#00F5FF'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

This design system embodies a "discipline-first" engineering culture. It is designed for a target audience of founders and technical leaders who value outcomes over fluff. The aesthetic is a fusion of **Corporate Minimalism** and **Technical Sophistication**, drawing heavily from high-fidelity developer tools.

The visual narrative is built on the concept of "The Focused Workspace." This is achieved through a dark-mode-first interface that reduces ocular strain while using high-contrast typography and electric accents to draw attention to critical data points. The style utilizes subtle glassmorphism and micro-gradients to create a sense of depth and physical presence, suggesting a product that is both robust and meticulously crafted.

## Colors

The palette is optimized for a deep-space environment. The core is a "Rich Black" (`#08090A`), providing a high-contrast foundation for "Electric Blue" (`#0071E3`) primary actions. 

- **Primary:** Used for high-priority CTAs and active states.
- **Secondary:** A soft lavender used for illustrative accents, secondary highlights, and "growth" indicators.
- **Neutral:** A range of deep charcoals are used to create structural hierarchy, ensuring that the interface never feels flat.
- **Accents:** Use "Electric Teal" sparingly for success states or to highlight technical performance metrics.

## Typography

The typography system relies on a tripartite structure to signify different types of information. 

1.  **Headlines (Geist):** Used for marketing statements and section headers. Its tight tracking and geometric construction feel modern and deliberate.
2.  **Body (Inter):** The workhorse for readability. Use generous line height (1.5x) to ensure long-form content is accessible.
3.  **Labels (JetBrains Mono):** Monospaced fonts are used for metadata, status tags, and technical values to reinforce the "built by engineers" persona.

Maintain a strict vertical rhythm by aligning all text to a 4px baseline grid.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for desktop, centered within the viewport. For mobile, a single-column fluid layout with 16px side margins is standard.

Spacing is strictly derived from a **4px base unit**. All padding, margins, and component heights should be multiples of 4 (e.g., 8, 16, 24, 32, 64). 

- **Desktop Breakpoint:** 1024px+
- **Tablet Breakpoint:** 768px - 1023px
- **Mobile Breakpoint:** < 768px

Whitespace is used aggressively to separate logical sections, mimicking Apple's editorial layouts. Do not crowd elements; let the typography and color accents guide the eye.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

- **Level 0 (Base):** `#08090A` - The primary background.
- **Level 1 (Cards/Panels):** `#121417` - A slightly lighter charcoal with a 1px solid border (`#2A2D32`).
- **Level 2 (Overlays/Modals):** A semi-transparent surface (60% opacity) with a 20px backdrop blur. This "Frosted Glass" effect should be used for navigation bars and floating menus to maintain context of the content underneath.
- **Shadows:** When necessary for floating elements (like dropdowns), use a "Long Ambient" shadow: `0 20px 40px rgba(0,0,0,0.4)` with no spread.

## Shapes

The shape language is "Soft-Technical." Elements use a consistent **4px (0.25rem)** corner radius for standard components like input fields and buttons. This small radius keeps the UI feeling sharp and precise.

Larger containers (Cards, Modals) may use **8px (0.5rem)** to appear more approachable. Avoid pill-shaped buttons unless used for tags or status chips, as they can feel too "consumer-soft" for a technical growth partner.

## Components

### Buttons
- **Primary:** Solid `#0071E3` background, white text. Subtle 1px inner top highlight to give a slight 3D "machined" feel.
- **Secondary:** Transparent background with a 1px border of `#2A2D32`. On hover, the background transitions to a 10% opacity white.

### Input Fields
- Dark backgrounds (`#0C0D0E`) with a 1px border. The border glows `#0071E3` on focus with a 2px outer blur.

### Cards
- Use the Level 1 surface. Use a subtle linear gradient from top-left (lightest) to bottom-right (darkest) to suggest a light source.

### Status Chips
- Always use the monospaced `label-sm` typography. Statuses should have a small 6px circular indicator icon next to the text.

### Navigation Bar
- Apply the Level 2 Glassmorphic effect. Keep the height fixed at 64px for desktop and 56px for mobile.
