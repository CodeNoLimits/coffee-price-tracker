# Mobile Design Coordination for KoffeeTrack

## Current Desktop Design Applied

The desktop version now features:
- **KoffeeTrack Dashboard Layout** with sidebar filters
- **Top Navigation Bar** with centered search
- **Left Sidebar** with advanced filters (Price Range, Roast Level, Origin, Flavor Profile)
- **Product Grid** with 4-column layout on 2xl screens
- **Real coffee data** from premium roasters
- **Functional features**: Wishlist, Comparison, Share

## Mobile Design Requirements

### Design System (Same as Desktop)
- **Colors**: Primary (#FF6F00), Rich Brown (#3E2723), Gold Accent (#FFB300), Cream (#FFF8E1)
- **Fonts**: Plus Jakarta Sans (body), Playfair Display (headings)
- **Spacing**: Consistent 4px/8px grid system

### Mobile Layout Structure

#### 1. Mobile Header (Sticky)
- **Height**: 69px
- **Layout**: 
  - Left: Hamburger menu icon + KoffeeTrack logo
  - Center: Search bar (full width, collapsible)
  - Right: Comparison badge (if items selected) + User avatar
- **Background**: White/80 with backdrop blur
- **Border**: Bottom border with subtle gray

#### 2. Mobile Sidebar (Slide-in)
- **Position**: Fixed, slides in from left
- **Width**: 80% of screen (max 320px)
- **Overlay**: Dark backdrop (50% opacity)
- **Content**: Same filters as desktop
- **Close**: X button in top right
- **Animation**: Smooth slide-in from left

#### 3. Mobile Search Bar
- **Position**: Below header, sticky
- **Design**: Full-width with search icon on left
- **Placeholder**: "Search by roaster or origin..."
- **Filter Button**: Icon button on right to open sidebar

#### 4. Mobile Product Grid
- **Layout**: 2 columns on mobile
- **Card Design**:
  - Product image (square, full width)
  - Roaster name (small, uppercase, primary color)
  - Product name (bold, large)
  - Price (Playfair Display, 3xl, bold)
  - AI Score badge (gold, with star icon)
  - Buy Now button (full width, primary color)
  - Wishlist heart (top left)
  - Comparison icon (top right)
- **Spacing**: 16px gap between cards
- **Padding**: 16px around grid

#### 5. Mobile Bottom Navigation
- **Position**: Fixed bottom
- **Items**:
  - Home (active state)
  - Search
  - Wishlist (with badge count)
  - Compare (with badge count)
  - Profile
- **Height**: 64px
- **Background**: White with border top
- **Icons**: 24px, with labels below

### Mobile-Specific Features

#### Filter Sidebar Mobile
- Slide-in animation from left
- Dark overlay when open
- Touch-friendly checkboxes (44px min)
- Scrollable origin list
- "Apply Filters" button at bottom (sticky)

#### Product Cards Mobile
- Swipe actions: 
  - Swipe right: Add to wishlist
  - Swipe left: Add to comparison
- Long press: Quick actions menu
- Tap: Open product detail (if implemented)

#### Search Mobile
- Expandable search bar
- Recent searches dropdown
- Voice search option (if available)
- Filter chips below search

### Touch Targets
- **Minimum**: 44x44px for all interactive elements
- **Buttons**: Minimum 48px height
- **Cards**: Full-width tap area
- **Spacing**: 8px minimum between touch targets

### Mobile Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile Animations
- **Sidebar**: Slide-in 300ms ease-out
- **Cards**: Fade-in with stagger (50ms delay)
- **Buttons**: Scale on press (0.95)
- **Toast**: Slide-up from bottom

### Mobile Performance
- **Lazy load images**: Load as user scrolls
- **Virtual scrolling**: For long product lists
- **Optimized images**: WebP format, responsive sizes
- **Minimal JavaScript**: Reduce bundle size

## Implementation Notes for Claude Code

1. **Responsive Sidebar**: 
   - Hidden on mobile by default
   - Opens with hamburger menu
   - Overlay prevents body scroll when open

2. **Product Grid**:
   - 2 columns on mobile (< 768px)
   - 3 columns on tablet (768px - 1023px)
   - 4 columns on desktop (1024px+)

3. **Search Bar**:
   - Full-width on mobile
   - Centered on desktop
   - Sticky positioning

4. **Bottom Navigation**:
   - Only show on mobile (< 768px)
   - Hide on desktop
   - Fixed position with safe area padding

5. **Comparison Modal**:
   - Full-screen on mobile
   - Centered modal on desktop
   - Swipeable product cards on mobile

## Design Consistency

- Use same color palette as desktop
- Maintain same typography scale (responsive)
- Keep same spacing system (scaled for mobile)
- Preserve brand identity (KoffeeTrack logo, colors)
- Match interaction patterns (hover → tap)

## Testing Checklist

- [ ] Sidebar opens/closes smoothly
- [ ] Filters work correctly on mobile
- [ ] Product cards are touch-friendly
- [ ] Search is accessible and functional
- [ ] Bottom navigation is sticky
- [ ] Comparison modal is usable
- [ ] Images load efficiently
- [ ] Performance is optimized
- [ ] Works on iOS and Android
- [ ] Dark mode works correctly

## Next Steps

1. Implement mobile sidebar with slide-in animation
2. Add bottom navigation bar for mobile
3. Optimize product grid for 2-column mobile layout
4. Add swipe gestures for product cards
5. Implement mobile-optimized comparison view
6. Add pull-to-refresh functionality
7. Optimize images for mobile bandwidth
8. Test on real devices

