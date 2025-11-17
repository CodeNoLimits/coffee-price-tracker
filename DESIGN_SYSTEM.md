# 🎨 Coffee Price Tracker - Design System
## Based on Mobile Mockup

---

## Color Palette

### Primary Colors
```css
--cream-bg: #F5EFE6;           /* Main background - warm cream */
--coral-primary: #FF6B35;      /* Primary CTA - coral/orange */
--coral-hover: #FF5722;        /* Hover state */
--green-success: #4CAF50;      /* AI score badges */
--dark-text: #2D2D2D;          /* Primary text */
--gray-secondary: #757575;     /* Secondary text (roaster names) */
--white: #FFFFFF;              /* Cards, search bar */
--black: #1A1A1A;              /* Product backgrounds (dark cards) */
```

### Usage
- Background: Cream (#F5EFE6)
- Cards: White (#FFFFFF)
- Buttons: Coral (#FF6B35)
- Text: Dark (#2D2D2D)
- Secondary: Gray (#757575)
- Success: Green (#4CAF50)

---

## Typography

### Font Families
```css
--font-heading: 'Playfair Display', serif;  /* Product names */
--font-body: 'Inter', sans-serif;           /* All other text */
```

### Scale (Mobile)
```css
--text-xs: 12px;      /* Labels, metadata */
--text-sm: 14px;      /* Secondary text, roaster names */
--text-base: 16px;    /* Body, search placeholder */
--text-lg: 18px;      /* Product names */
--text-xl: 24px;      /* Prices */
--text-2xl: 28px;     /* Page title "Deals" */
```

### Scale (Desktop)
```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 20px;
--text-xl: 28px;
--text-2xl: 32px;
--text-3xl: 48px;     /* Hero headings */
```

### Weights
- Regular: 400 (body text)
- Medium: 500 (roaster names)
- Semibold: 600 (product names)
- Bold: 700 (prices, headings)

---

## Spacing System

Base unit: 4px (multiples of 4)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Layout Spacing
- Card padding: 16px
- Card gap: 16px
- Section spacing: 24px
- Container padding: 20px (mobile), 40px (desktop)

---

## Border Radius

```css
--radius-sm: 8px;      /* Chips, small buttons */
--radius-md: 12px;     /* Search bar */
--radius-lg: 20px;     /* Product cards */
--radius-xl: 24px;     /* Large containers */
--radius-full: 9999px; /* Pills, badges */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Usage
- Cards: shadow-md
- Elevated cards (hover): shadow-lg
- Modals: shadow-xl

---

## Components

### Product Card (Mobile)
```
Dimensions: Flexible width, ~280px height
Border radius: 20px (--radius-lg)
Background: White
Padding: 16px
Shadow: shadow-md

Image container:
  - Aspect ratio: 1:1 (square)
  - Background: Light gray or product-specific
  - Border radius: 12px
  - AI badge: Position absolute, top-right, -8px offset

Content:
  - Roaster: 14px, gray (#757575), medium weight
  - Product name: 18px, dark (#2D2D2D), semibold, 2 lines max
  - Price: 24px, dark, bold
  - Button: Full width, 44px height, coral, white text, semibold
```

### Search Bar
```
Height: 52px
Border radius: 12px (--radius-md)
Background: White
Padding: 12px 16px
Shadow: shadow-sm
Icon: 24px, gray
Placeholder: 16px, gray (#9E9E9E)
```

### Category Chip
```
Height: 40px
Padding: 12px 20px
Border radius: 9999px (--radius-full)
Font: 14px, medium

Active state:
  - Background: Coral (#FF6B35)
  - Text: White

Inactive state:
  - Background: White
  - Text: Dark (#2D2D2D)
  - Border: 1px solid #E0E0E0
```

### AI Score Badge
```
Size: 48px × 48px
Border radius: 50% (circle)
Background: Green (#4CAF50)
Border: 3px solid white
Font: 16px, bold, white
Position: Absolute, top-right of image, -8px offset
Box shadow: 0 2px 4px rgba(0,0,0,0.1)
```

### Bottom Navigation
```
Height: 64px
Background: White
Border top: 1px solid #E0E0E0
Shadow: 0 -2px 10px rgba(0,0,0,0.05)

Icons: 24px
Text: 12px
Spacing: Equal distribution

Active state:
  - Icon: Coral (#FF6B35)
  - Text: Coral (#FF6B35)

Inactive state:
  - Icon: Gray (#9E9E9E)
  - Text: Gray (#9E9E9E)
```

### Button
```
Primary (View Deal):
  - Height: 44px
  - Background: Coral (#FF6B35)
  - Text: White, 16px, semibold
  - Border radius: 12px
  - Hover: Darken to #FF5722
  - Active: Scale 0.98

Secondary (outline):
  - Background: Transparent
  - Border: 2px solid #E0E0E0
  - Text: Dark (#2D2D2D)
  - Hover: Border color coral
```

---

## Layout Grid

### Mobile (up to 768px)
- Container: Full width, 20px padding
- Product grid: 2 columns, 16px gap
- Max content width: 100%

### Tablet (768px - 1024px)
- Container: 90%, 40px padding
- Product grid: 3 columns, 24px gap
- Max content width: 960px

### Desktop (1024px+)
- Container: Max 1280px, centered, 60px padding
- Product grid: 4 columns, 24px gap
- Max content width: 1280px

---

## Responsive Breakpoints

```css
--mobile: 0px;
--tablet: 768px;
--desktop: 1024px;
--desktop-lg: 1280px;
--desktop-xl: 1536px;
```

---

## Motion & Animation

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Durations
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
```

### Animations
- Hover scale: 1.02 (cards), 0.98 (buttons pressed)
- Transition: all 200ms ease-out
- Page load: Fade in 300ms
- Modal: Slide up 200ms

---

## Accessibility

### Minimum Touch Targets
- Buttons: 44px × 44px minimum
- Icons: 24px with 44px touch area
- Chips: 40px height

### Color Contrast
- Text on white: 4.5:1 minimum (WCAG AA)
- Buttons: 3:1 minimum
- Check: Dark (#2D2D2D) on White = 14.6:1 ✅
- Check: Coral (#FF6B35) on White = 3.2:1 ✅

### Focus States
- Outline: 2px solid coral
- Offset: 2px
- Border radius: Match element

---

## Implementation Notes

1. Use Tailwind CSS for rapid development
2. Create reusable components for cards, buttons, chips
3. Mobile-first approach (design from mobile up)
4. Use CSS variables for easy theming
5. Implement dark mode (future): Adjust background to #1A1A1A, cards to #2D2D2D

---

## Design Principles

1. **Clarity over cleverness**: Simple, clear hierarchy
2. **Generous spacing**: Let content breathe
3. **Warm & inviting**: Coffee-inspired color palette
4. **Data-driven**: Emphasize prices and AI scores
5. **Touch-friendly**: Large tap targets on mobile
6. **Premium feel**: High-quality imagery, subtle shadows

---

Last updated: 2025-11-17
Version: 1.0 - Based on mobile mockup
