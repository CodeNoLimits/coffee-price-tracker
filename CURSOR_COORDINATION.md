# 🤝 Cursor + Claude Code Coordination Plan

## Current Situation

**User's Mockup Design:**
- Simple, minimal, clean (like the mobile screenshot)
- Cream background (#F5EFE6)
- Coral buttons (#FF6B35)
- 2-column product grid
- Bottom navigation
- Simple header with "Deals"

**Cursor is building:**
- Feature-rich version with wishlists, comparison, stats
- Top navigation bar
- More complex layout
- Advanced features

**Claude Code created:**
- `page-mockup-match.tsx` - Exact pixel-perfect match of mockup
- `DESIGN_SYSTEM.md` - Complete design system from mockup
- `DESIGN_PROMPTS.md` - AI generation prompts

---

## Recommended Strategy

### Phase 1: Launch Clean MVP (Matches Mockup) ✅
**File:** `app/page.tsx` should use `page-mockup-match.tsx`

**Why:**
- User explicitly requested to match the mockup design
- Simpler = faster deployment
- Beautiful, clean aesthetic
- Mobile-first (most coffee shoppers are mobile!)

**Features:**
- ✅ Search
- ✅ Filter chips (All, Best Deals, Budget, Premium)
- ✅ 2-column product grid
- ✅ AI score badges
- ✅ Bottom navigation
- ✅ Clean, minimal design

### Phase 2: Add Features Incrementally
**Use Cursor's work** for v2 features:

1. **Wishlist/Favorites** (Cursor has this ready)
2. **Comparison** (up to 3 products)
3. **Stats Dashboard** (avg price, best price, etc.)
4. **Share functionality**
5. **Price alerts**
6. **Price history charts**

---

## Implementation Plan

### Step 1: Deploy Mockup-Match Version
```bash
# Replace current page.tsx with mockup-match
cp app/page-mockup-match.tsx app/page.tsx

# Keep Cursor's version as page-features.tsx for later
mv app/page.tsx app/page-features.tsx (if Cursor's changes)
mv app/page-mockup-match.tsx app/page.tsx
```

### Step 2: Harmonize Desktop Version
Create responsive breakpoints:
- Mobile (< 768px): 2-column grid, bottom nav
- Tablet (768-1024px): 3-column grid
- Desktop (> 1024px): 4-column grid, top nav

### Step 3: Layer in Cursor's Features
Add one feature at a time:
1. Local storage wishlist
2. Comparison drawer
3. Stats cards
4. Advanced filters

---

## Design System to Use

### Colors (From Mockup)
```css
--cream-bg: #F5EFE6;
--coral-primary: #FF6B35;
--green-success: #4CAF50;
--dark-text: #2D2D2D;
--gray-secondary: #757575;
```

### Typography
- Headings: Playfair Display (serif)
- Body: Inter or Plus Jakarta Sans
- Product names: Playfair Display
- Buttons: Inter/Plus Jakarta Sans, semibold

### Spacing
- Cards: 20px border radius
- Buttons: 12px border radius
- Grid gap: 16px
- Container padding: 20px

---

## Decision Matrix

| Feature | MVP (Now) | V2 (Later) |
|---------|-----------|------------|
| Product Grid | ✅ | ✅ |
| Search | ✅ | ✅ |
| Filters | ✅ (4 chips) | ✅ (Advanced) |
| Bottom Nav | ✅ | ✅ |
| AI Scores | ✅ | ✅ |
| Wishlist | ❌ | ✅ (Cursor) |
| Comparison | ❌ | ✅ (Cursor) |
| Stats | ❌ | ✅ (Cursor) |
| Share | ❌ | ✅ (Cursor) |
| Alerts | ❌ | ✅ |
| Charts | ❌ | ✅ |

---

## Files Status

### Created by Claude Code
- ✅ `DESIGN_SYSTEM.md` - Complete design tokens
- ✅ `DESIGN_PROMPTS.md` - AI generation prompts
- ✅ `DESIGN_QUICK_START.md` - Quick reference
- ✅ `page-mockup-match.tsx` - Pixel-perfect mockup match
- ✅ `next.config.js` - Updated with remotePatterns

### Modified by Cursor
- 🔄 `app/page.tsx` - Feature-rich version (wishlist, comparison)
- 🔄 `app/globals.css` - Advanced CSS with animations
- 🔄 `app/layout.tsx` - Plus Jakarta Sans font
- 🔄 `app/api/coffee/route.ts` - Enhanced data handling

---

## Next Actions

### For User:
1. **Choose approach:**
   - Option A: Deploy clean mockup match (simple, beautiful, now)
   - Option B: Keep Cursor's feature-rich version
   - Option C: Hybrid (mockup design + Cursor features)

2. **If Option A (Recommended):**
   ```bash
   # I'll replace page.tsx with mockup-match
   # Deploy to Vercel
   # Then add features incrementally
   ```

3. **If Option C:**
   - Use mockup visual design (colors, spacing, layout)
   - Add Cursor's features (wishlist, comparison)
   - Best of both worlds

### For Cursor:
- Your wishlist, comparison, and stats features are excellent!
- Let's integrate them into the clean mockup design
- Keep your localStorage logic, share functionality
- Merge into Phase 2

---

## Recommendation

**Ship the clean mockup-match version NOW:**
- ✅ Matches user's beautiful design
- ✅ Simple, fast, works perfectly
- ✅ Mobile-first (coffee buyers are mobile!)
- ✅ Can add Cursor's features later

**Then iterate:**
- Add wishlist (from Cursor)
- Add comparison (from Cursor)
- Add stats (from Cursor)
- Each as a separate commit

---

## Communication

**To User:** Which approach do you prefer?
1. Clean mockup match (ship today)
2. Feature-rich (Cursor's work)
3. Hybrid (mockup design + features)

**To Cursor:** Great work on the features! Let's integrate your localStorage wishlist, comparison, and stats into the clean mockup design in Phase 2.

---

Last updated: 2025-11-17
Status: Awaiting user decision
