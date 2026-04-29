---
name: Editorial Sport Luxe
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#236391'
  on-secondary: '#ffffff'
  secondary-container: '#91c9fe'
  on-secondary-container: '#0b5583'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1d'
  on-tertiary-container: '#838486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#96ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004a75'
  tertiary-fixed: '#e2e2e4'
  tertiary-fixed-dim: '#c6c6c8'
  on-tertiary-fixed: '#1a1c1d'
  on-tertiary-fixed-variant: '#454749'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

This design system is built for a luxury football jersey brand that bridges the gap between 90s nostalgia and modern minimalism. The aesthetic is high-end editorial, evoking the feeling of a premium fashion magazine rather than a traditional sports retailer. 

The design style is **Minimalism** with an emphasis on **High-Contrast**. It utilizes heavy whitespace to frame products like art pieces in a gallery. The emotional response should be one of "Heritage through a Modern Lens"—sophisticated, exclusive, and precise. Visuals are dominated by large-scale photography, sharp typography, and a restrained color application that highlights the "Light Argentina Blue" as a mark of quality and lineage.

## Colors

The palette is rooted in a monochromatic foundation to maintain a premium, timeless feel. 

- **Deep Black (#000000):** Used for primary typography, icons, and structural elements to provide weight and authority.
- **Pure White (#FFFFFF):** The primary canvas. Use extensively to create a sense of breathability and focus.
- **Light Argentina Blue (#74ACDF):** An intentional accent used sparingly. It identifies the brand's heritage and is reserved for interactive states (links, primary buttons) and subtle branding details.
- **Off-White (#F5F5F7):** Utilized for secondary backgrounds and subtle section containers to break the starkness of pure white without losing the minimalist aesthetic.

## Typography

Typography is the cornerstone of this design system’s premium feel. 

**Epilogue** is used for all headlines. Its geometric yet slightly expressive nature provides an editorial edge that feels both contemporary and archival. Headlines should use tight tracking and bold weights to create a "wall of text" effect for hero sections.

**Inter** is the functional workhorse for body copy and labels. It ensures maximum readability and a systematic, clean look that mimics the Apple.com interface. For labels and metadata (e.g., product SKUs, jersey numbers), use the `label-caps` style with increased letter spacing to evoke luxury branding.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop and a fluid grid for mobile devices. The layout centers on a 12-column grid with generous gutters to maintain the "Editorial" look.

- **Vertical Rhythm:** A strict 8px base unit controls all spacing. Section gaps are intentionally large (120px+) to force the user to focus on one product story at a time.
- **Composition:** Asymmetric layouts are encouraged for lookbook sections, while product grids should remain rigid and balanced. 
- **Safe Zones:** Content containers should never feel crowded; maintain at least 80px of vertical padding between different content types.

## Elevation & Depth

To maintain a minimalist and modern aesthetic, depth is created through **Tonal Layers** rather than heavy shadows.

- **Flat Planes:** Elements should appear to exist on the same physical plane, using the `#F5F5F7` background to differentiate containers from the `#FFFFFF` page surface.
- **Micro-Shadows:** Only used for floating navigation or active product cards. These should be "Ambient Shadows"—extremely diffused (30-40px blur), low opacity (around 4-6%), and tinted with a hint of the primary black to prevent a "dirty" look.
- **Glassmorphism:** Reserved exclusively for navigation bars. A high-blur backdrop filter (20px+) with a 70% opaque white background creates the signature premium frosted effect seen in modern high-end interfaces.

## Shapes

The shape language is **Rounded**, following the "squircle" philosophy. While the overall layout feels structured and architectural, the individual components feature softened corners to feel more approachable and modern.

- **Standard Radius:** 0.5rem (8px) for buttons and inputs.
- **Large Radius:** 1rem (16px) for cards and featured image containers.
- **Pill Shape:** Used exclusively for tags, chips, and small promotional badges to contrast against the more rectangular grid.

## Components

### Buttons
Primary buttons are solid `#000000` with `#FFFFFF` text. Secondary buttons use a "Ghost" style: a 1px border of the primary color with no fill. All buttons feature a subtle transition to `#74ACDF` on hover.

### Cards (Lookbook & Product)
Product cards use a "borderless" style. The product image is placed on an `#F5F5F7` background with 16px corner rounding. Text metadata is placed below the image with no containing border, creating a clean, airy feel.

### Input Fields
Inputs are minimalist: a single bottom border or a very light 1px outline in `#F5F5F7`. On focus, the border shifts to the primary black or accent blue.

### Chips & Badges
Small, pill-shaped elements used for "Limited Edition" or "New Arrival" labels. Use the `label-caps` typography style and a light blue background (`#74ACDF` at 10% opacity) with blue text.

### Navigation
The main navigation should be sticky with a frosted glass effect. Use simple text links in `#000000` with the icon-only brand mark centered for a balanced, symmetrical appearance.