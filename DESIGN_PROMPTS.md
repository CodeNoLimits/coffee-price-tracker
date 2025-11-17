# Coffee Price Tracker - Design Prompts for Google Stitch

## General Design System & Brand Guidelines

**Overall Style:**
- Minimalist, premium aesthetic inspired by Blue Bottle Coffee, Stumptown, and Intelligentsia
- Clean, sophisticated design with ample white space
- Coffee-themed color palette: cream (#FAF8F5), rich brown (#2C1810), gold accents (#C9A961)
- Typography: Modern sans-serif (Inter) with elegant serif (Playfair Display) for headings
- Subtle shadows, thin borders, refined spacing
- Professional, trustworthy, premium feel

**Color Palette:**
- Primary Background: #FAF8F5 (Cream)
- Primary Text: #1F1F1F (Dark Gray)
- Secondary Text: #6B6B6B (Medium Gray)
- Accent: #2C1810 (Rich Brown)
- Gold Accent: #C9A961
- Border: #E8E5E0 (Light Beige)
- Success: #10B981 (Green for deals)
- White: #FFFFFF

**Typography:**
- Headings: Bold, 500-700 weight, tight letter spacing
- Body: Regular, 400 weight, comfortable line height
- Small text: 0.75rem-0.875rem for labels and metadata

---

## WEB DESIGN PROMPTS

### 1. Homepage / Product Listing Page

**Prompt:**
Design a minimalist coffee price tracker homepage that displays a grid of coffee products. The page should feature:

- **Header Section:**
  - Clean navigation bar with logo (coffee icon + "Coffee Price Tracker" text)
  - Stats dashboard showing: Total Products, Average Price, Best Price, Wishlist Count (4 cards in a row)
  - Refresh button in top right
  - Sticky header with subtle shadow

- **Hero/Best Deal Section:**
  - Large featured card highlighting the best deal (highest AI score)
  - Two-column layout: Left side with product details, right side with price and CTA
  - Badge showing AI score (e.g., "92/100")
  - Star rating display
  - Prominent "Buy Now" button
  - Subtle background pattern or gradient

- **Filters & Search Bar:**
  - Clean search input with search icon
  - Filter chips: All, Best Deals, Budget, Premium, Wishlist
  - Sort dropdown: Best Score, Lowest Price, Name A-Z
  - Results count display
  - All contained in a white card with subtle border

- **Product Grid:**
  - 3-column grid on desktop, 2 on tablet, 1 on mobile
  - Each product card should have:
    - Product image (48:32 aspect ratio) with hover zoom effect
    - Wishlist heart icon (top left)
    - Comparison checkbox icon (top right)
    - AI score badge if >75
    - Product name (bold, large)
    - Roaster name (small, gray)
    - Description (2 lines, truncated)
    - Origin and rating icons
    - Flavor notes as small tags
    - Price prominently displayed (large, bold)
    - Price per oz (small, gray)
    - Share button and "Buy" button
  - Cards should have subtle hover effects (lift, shadow increase)
  - Clean white cards with thin borders

- **Empty State:**
  - Centered coffee icon
  - "No coffee found" message
  - "Clear Filters" button

- **Footer:**
  - Minimalist footer with simple text
  - "Real-time prices from premium coffee roasters"

**Design Requirements:**
- Lots of white space
- Clean typography hierarchy
- Subtle animations on hover
- Mobile-responsive grid
- Professional, premium aesthetic

---

### 2. Product Detail Modal / Comparison View

**Prompt:**
Design a modal overlay for comparing up to 3 coffee products side-by-side:

- **Modal Structure:**
  - Dark overlay (50% opacity, blur effect)
  - White modal card (centered, max-width 1200px)
  - Close button (X) in top right
  - "Compare Products" heading

- **Comparison Grid:**
  - 3-column layout (or fewer if less products selected)
  - Each column shows:
    - Product name (bold)
    - Roaster name
    - Key metrics in a clean list:
      - Price: $XX.XX
      - Price/oz: $X.XX
      - AI Score: XX/100
    - "Buy Now" button at bottom
  - Side-by-side comparison makes it easy to see differences
  - Clean borders between columns

- **Visual Style:**
  - Clean, data-focused design
  - Easy to scan and compare
  - Professional presentation

---

### 3. Wishlist Page

**Prompt:**
Design a dedicated wishlist page showing saved coffee products:

- **Page Header:**
  - "My Wishlist" heading
  - Count of items (e.g., "12 items")
  - Option to clear all or filter

- **Wishlist Grid:**
  - Same product card design as homepage
  - Heart icon filled/active on all items
  - Remove from wishlist option
  - Empty state if no items: "Your wishlist is empty" with coffee icon

- **Additional Features:**
  - Sort by: Date added, Price, AI Score
  - Share wishlist option
  - Export to PDF option (optional)

---

### 4. Search Results Page

**Prompt:**
Design a search results page with advanced filtering:

- **Search Bar:**
  - Prominent search input at top
  - Real-time search results
  - Search suggestions/dropdown

- **Filters Sidebar (Desktop):**
  - Price range slider
  - Roaster filter (checkboxes)
  - Origin filter (checkboxes)
  - Roast level filter
  - Flavor notes filter
  - AI Score range
  - Clear all filters button

- **Results Section:**
  - Same product grid as homepage
  - Results count
  - Sort options
  - Pagination or infinite scroll

---

### 5. Price Alert / Notification Settings Page

**Prompt:**
Design a settings page for price alerts:

- **Page Layout:**
  - "Price Alerts" heading
  - Toggle switches for email notifications
  - List of products with price alerts set
  - Alert threshold input (e.g., "Notify me when price drops below $XX")

- **Alert Cards:**
  - Product image and name
  - Current price
  - Alert price threshold
  - Toggle on/off
  - Delete alert option

- **Empty State:**
  - "No price alerts set"
  - CTA to browse products and set alerts

---

## MOBILE APP DESIGN PROMPTS

### 1. Mobile App - Home Screen

**Prompt:**
Design a mobile-first home screen for the coffee price tracker app:

- **Top Navigation:**
  - Hamburger menu icon (left)
  - App logo/icon (center)
  - Wishlist icon with badge count (right)
  - Search icon (right)

- **Stats Cards:**
  - Horizontal scrollable cards
  - 4 cards: Products, Avg Price, Best Price, Wishlist
  - Swipeable, compact design
  - Each card shows number and label

- **Best Deal Banner:**
  - Full-width card with gradient background
  - Product image on left (small)
  - Product name, roaster, price on right
  - "View Deal" button
  - Swipeable if multiple deals

- **Quick Filters:**
  - Horizontal scrollable filter chips
  - All, Deals, Budget, Premium, Wishlist
  - Active state clearly indicated

- **Product List:**
  - Vertical scrolling list
  - Each item shows:
    - Product image (square, left)
    - Product name and roaster (center)
    - Price (right, bold)
    - Heart icon for wishlist (top right of image)
    - Swipe actions: Compare, Share
  - Pull to refresh
  - Infinite scroll or "Load More" button

- **Bottom Navigation:**
  - Home (active)
  - Search
  - Wishlist
  - Compare
  - Profile/Settings

**Design Requirements:**
- Touch-friendly (44px minimum touch targets)
- Thumb-friendly navigation
- Smooth animations
- Native app feel

---

### 2. Mobile App - Product Detail Screen

**Prompt:**
Design a full-screen product detail view for mobile:

- **Hero Image:**
  - Full-width product image
  - Back button (top left)
  - Share and wishlist buttons (top right)
  - AI score badge overlay

- **Product Information:**
  - Product name (large, bold)
  - Roaster name
  - Star rating
  - Price (very large, prominent)
  - Price per oz
  - Description (expandable)
  - Origin, Roast Level, Flavor Notes
  - All in clean, scannable sections

- **Action Buttons:**
  - "Buy Now" button (full-width, sticky bottom)
  - "Add to Comparison" button
  - "Set Price Alert" button

- **Related Products:**
  - Horizontal scrollable section
  - "You might also like" heading

---

### 3. Mobile App - Comparison Screen

**Prompt:**
Design a mobile comparison screen:

- **Header:**
  - "Compare" title
  - Close/back button
  - Clear all button

- **Comparison Cards:**
  - Stacked cards (one per product)
  - Swipe between products
  - Or side-by-side scrollable view
  - Each card shows key metrics
  - Visual indicators for best value

- **Summary Section:**
  - Quick comparison table
  - Highlight best price, best score
  - "Buy Best Deal" CTA

---

### 4. Mobile App - Wishlist Screen

**Prompt:**
Design a mobile wishlist screen:

- **Header:**
  - "My Wishlist" title
  - Item count
  - Sort/filter button

- **Wishlist Items:**
  - List view similar to home screen
  - Heart icon filled/active
  - Swipe to remove
  - Long press for options (share, compare, remove)

- **Empty State:**
  - Large coffee icon
  - "Your wishlist is empty"
  - "Browse Products" button

---

### 5. Mobile App - Search Screen

**Prompt:**
Design a mobile search screen:

- **Search Bar:**
  - Full-width at top
  - Voice search icon
  - Recent searches below
  - Search suggestions as you type

- **Filters:**
  - Collapsible filter sections
  - Price range slider
  - Multi-select checkboxes
  - "Apply Filters" button

- **Results:**
  - Same list view as home
  - Filter count badge
  - Clear filters option

---

### 6. Mobile App - Profile/Settings Screen

**Prompt:**
Design a mobile settings/profile screen:

- **Profile Section:**
  - Avatar/icon
  - Name/email
  - Edit profile option

- **Settings List:**
  - Notifications toggle
  - Price alerts
  - Currency preference
  - Language
  - About
  - Help & Support
  - Logout

- **Clean list design:**
  - Icons on left
  - Text in middle
  - Chevron/arrow on right
  - Section dividers

---

## ADDITIONAL DESIGN ELEMENTS

### Loading States

**Prompt:**
Design elegant loading states:
- Skeleton screens matching the layout
- Subtle shimmer animation
- Coffee icon with pulse animation
- "Loading coffee..." text

### Empty States

**Prompt:**
Design friendly empty states:
- Large, subtle coffee icon
- Helpful message
- Clear CTA button
- Consistent across all pages

### Toast Notifications

**Prompt:**
Design toast notifications:
- Bottom-right position (desktop)
- Bottom-center (mobile)
- Dark background with white text
- Subtle slide-up animation
- Auto-dismiss after 3 seconds
- Success (green) and Info (blue) variants

### Error States

**Prompt:**
Design error states:
- Friendly error message
- Retry button
- Helpful guidance
- Consistent with overall design

---

## DESIGN PRINCIPLES TO FOLLOW

1. **Minimalism First:** Less is more. Remove unnecessary elements.
2. **White Space:** Generous spacing creates premium feel.
3. **Typography Hierarchy:** Clear visual hierarchy through size and weight.
4. **Consistent Spacing:** Use 4px or 8px grid system.
5. **Subtle Interactions:** Gentle hover effects, smooth transitions.
6. **Accessibility:** High contrast, readable fonts, touch-friendly targets.
7. **Mobile-First:** Design for mobile, enhance for desktop.
8. **Performance:** Lightweight, fast-loading designs.
9. **Brand Consistency:** Coffee-themed but professional.
10. **User-Centric:** Focus on user needs and clear CTAs.

---

## TECHNICAL SPECIFICATIONS

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Touch Targets:**
- Minimum 44x44px for mobile
- Comfortable spacing between interactive elements

**Animations:**
- Duration: 200-300ms for micro-interactions
- Easing: ease-out for most animations
- Subtle, not distracting

**Images:**
- Product images: 16:9 or 4:3 aspect ratio
- Optimized, lazy-loaded
- Placeholder with coffee icon

---

## FINAL NOTES

All designs should feel:
- **Premium:** High-quality, sophisticated
- **Trustworthy:** Professional, reliable
- **Approachable:** Friendly, not intimidating
- **Functional:** Every element serves a purpose
- **Beautiful:** Visually pleasing, well-crafted

The overall aesthetic should match premium coffee roasters like Blue Bottle, Stumptown, and Intelligentsia - clean, modern, and focused on the product.
