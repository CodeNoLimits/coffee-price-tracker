# ⚡ Quick Start - Design Prompts for AI

## 🎯 TL;DR - Start Here

### Universal Prompt Template
Copy this and append your specific screen description:

```
Premium coffee price tracker app design. Modern, clean aesthetic inspired by Stripe and Blue Bottle Coffee. Warm earth tones: rich browns (#3E2723), cream (#FFF8E1), burnt orange (#FF6F00), gold accents (#FFB300). Elegant typography (Plus Jakarta Sans + Playfair Display). Generous white space, soft shadows, subtle gradients. Trustworthy, data-driven interface. [YOUR SPECIFIC SCREEN DESCRIPTION]. High-fidelity UI design, professional mockup, Dribbble quality, 4K.
```

---

## 📱 Top 5 Essential Screens

### 1. Mobile Home Screen (MOST IMPORTANT)
```
[Universal template] + Mobile app home screen showing coffee product grid. Search bar at top with filter icons. Horizontal category chips (All, Best Deals🔥, Budget💰, Premium⭐). Two-column grid of coffee cards below. Each card: coffee bag image, roaster name, price (large), AI score badge (green circle 0-100), Buy button. Bottom navigation bar. Clean white background, modern iOS/Android style.
```

### 2. Desktop Homepage Hero
```
[Universal template] + Desktop homepage hero section. Left: Large heading "Find Premium Coffee at Best Prices", subheading about AI-powered comparison, two CTA buttons (Browse Coffees orange + See How It Works outline). Right: 3D dashboard mockup. Background: cream to light orange gradient with coffee bean pattern overlay 5% opacity. Top: dark brown navigation bar with logo.
```

### 3. Product Card Component (Reusable)
```
[Universal template] + E-commerce product card 400x500px. Square coffee bag image on light gradient. Green AI score badge top-right. Below: roaster name small caps, product name serif 2 lines, star rating, price bold $24.99, price per oz gray, 3 flavor chips, orange Buy Now button hover. White background, subtle shadow.
```

### 4. Product Detail Mobile
```
[Universal template] + Mobile product detail screen. Large hero image coffee bag at top. Back arrow and heart icon. Scroll content: product name serif large, price prominent with "Best Price" badge, green AI recommendation card with score explanation, tabs (Details/Reviews/Price History), origin/roast/flavors, price trend chart. Sticky orange "Buy Now" button bottom full-width.
```

### 5. Search & Filter Mobile
```
[Universal template] + Mobile search and filters. Top: search bar with placeholder. Horizontal scrolling quick filters chips. Advanced filters: price range slider, roast level visual icons, origin dropdown with flags, flavor profile multi-select, rating stars. Bottom: "Show Results (24)" button orange. Clean organized layout like Airbnb filters.
```

---

## 🎨 Design System Quick Reference

**Colors:**
- Primary: #3E2723 (brown), #FF6F00 (orange)
- Accents: #FFB300 (gold), #00C853 (green deals)
- Background: #FFF8E1 (cream), #F5F5F5 (light gray)

**Typography:**
- Headings: Playfair Display (serif)
- Body: Plus Jakarta Sans (sans-serif)
- Sizes: H1 48px, H2 36px, Body 16px, Small 14px

**Spacing:**
- Base unit: 8px (use multiples: 16, 24, 32, 48)

**Corners:**
- Cards: 12px, Buttons: 8px, Containers: 24px

**Shadows:**
- Subtle: 0 4px 6px rgba(0,0,0,0.1)
- Elevated: 0 10px 40px rgba(0,0,0,0.15)

---

## 🚀 How to Use

1. Copy the **Universal Prompt Template**
2. Add one of the **specific screen descriptions**
3. Paste into AI image generator:
   - **Google Imagen** (Gemini)
   - **Midjourney** (Discord)
   - **DALL-E 3** (ChatGPT Plus)
   - **Ideogram** (ideogram.ai)

4. Generate → Review → Iterate with refinements:
   - "Make it more spacious"
   - "Add more premium feel"
   - "Show dark mode version"
   - "Mobile 9:16 aspect ratio"

---

## 📋 Complete Screen List

**Mobile App (Priority Order):**
1. ✅ Home Screen (product grid)
2. ✅ Product Detail
3. ✅ Search & Filter
4. Splash Screen
5. Onboarding (3 screens)
6. Comparison View
7. Favorites
8. Settings/Profile

**Desktop Web:**
1. ✅ Homepage Hero
2. Main Dashboard (grid)
3. Product Detail Page
4. Price Analytics Dashboard
5. Comparison Table
6. How It Works
7. About/Trust Page
8. Blog/Education

**Components:**
- ✅ Product Card
- Search Bar
- Filter Panel
- AI Recommendation Card
- Empty States
- Loading States

See **DESIGN_PROMPTS.md** for full detailed prompts for every screen.

---

## 💡 Pro Tips

1. **Consistency**: Use the same color codes and fonts across all prompts
2. **Iterations**: Generate 3-4 variations, pick best, refine
3. **References**: Add "like [Stripe/Notion/Apple Store]" for style guidance
4. **Aspect Ratios**:
   - Mobile: 9:16 (portrait)
   - Desktop: 16:9 (landscape)
   - Cards/Components: 1:1 or custom dimensions

4. **Export**: Request "high-fidelity, 4K, professional mockup quality"

---

## 🎯 Next Steps After Generating Designs

1. Review all generated screens for consistency
2. Extract design tokens (exact colors, spacing, typography)
3. Create a Figma/design system file
4. Hand off to developer with specifications
5. Implement using Tailwind CSS + Next.js (already set up!)

Good luck! Your coffee tracker will look world-class ☕✨
