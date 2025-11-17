'use client';

import { useEffect, useState } from 'react';
import { Coffee, Search, Heart, Share2, X, BarChart3, Check, Menu, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoffeeProduct {
  id: string;
  name: string;
  roaster: string;
  price: number;
  weight: string;
  pricePerOz: number;
  description: string;
  origin?: string;
  roastLevel?: string;
  flavorNotes?: string[];
  link: string;
  imageUrl?: string;
  rating?: number;
  aiScore: number;
  recommendation: string;
}

export default function Home() {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [comparison, setComparison] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([15, 75]);
  const [roastLevels, setRoastLevels] = useState<Set<string>>(new Set(['Light', 'Medium']));
  const [origins, setOrigins] = useState<Set<string>>(new Set(['Ethiopia']));
  const [flavorProfiles, setFlavorProfiles] = useState<Set<string>>(new Set(['Fruity', 'Floral']));

  const fetchCoffee = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/coffee');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch coffee:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffee();
    const savedWishlist = localStorage.getItem('coffee-wishlist');
    if (savedWishlist) {
      setWishlist(new Set(JSON.parse(savedWishlist)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coffee-wishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist]);

  const toggleWishlist = (id: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
      showToast('Removed from wishlist', 'info');
    } else {
      newWishlist.add(id);
      showToast('Added to wishlist', 'success');
    }
    setWishlist(newWishlist);
  };

  const toggleComparison = (id: string) => {
    const newComparison = new Set(comparison);
    if (newComparison.has(id)) {
      newComparison.delete(id);
    } else {
      if (newComparison.size >= 3) {
        showToast('Maximum 3 products for comparison', 'info');
        return;
      }
      newComparison.add(id);
    }
    setComparison(newComparison);
  };

  const toggleRoastLevel = (level: string) => {
    const newLevels = new Set(roastLevels);
    if (newLevels.has(level)) {
      newLevels.delete(level);
    } else {
      newLevels.add(level);
    }
    setRoastLevels(newLevels);
  };

  const toggleOrigin = (origin: string) => {
    const newOrigins = new Set(origins);
    if (newOrigins.has(origin)) {
      newOrigins.delete(origin);
    } else {
      newOrigins.add(origin);
    }
    setOrigins(newOrigins);
  };

  const toggleFlavorProfile = (flavor: string) => {
    const newFlavors = new Set(flavorProfiles);
    if (newFlavors.has(flavor)) {
      newFlavors.delete(flavor);
    } else {
      newFlavors.add(flavor);
    }
    setFlavorProfiles(newFlavors);
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const shareProduct = async (product: CoffeeProduct) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} by ${product.roaster}`,
          text: product.description,
          url: product.link,
        });
        showToast('Shared successfully', 'success');
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(product.link);
      showToast('Link copied to clipboard', 'success');
    }
  };

  // Get unique values for filters
  const allOrigins = Array.from(new Set(products.flatMap(p => p.origin?.split(', ') || []))).filter(Boolean);
  const allFlavors = Array.from(new Set(products.flatMap(p => p.flavorNotes || []))).filter(Boolean);

  const filteredProducts = products
    .filter(p => {
      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      
      // Roast level filter
      if (roastLevels.size > 0 && p.roastLevel && !roastLevels.has(p.roastLevel)) return false;
      
      // Origin filter
      if (origins.size > 0 && p.origin) {
        const productOrigins = p.origin.split(', ').map(o => o.trim());
        if (!productOrigins.some(o => origins.has(o))) return false;
      }
      
      // Flavor profile filter
      if (flavorProfiles.size > 0 && p.flavorNotes) {
        if (!p.flavorNotes.some(f => flavorProfiles.has(f))) return false;
      }
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!p.name.toLowerCase().includes(searchLower) &&
            !p.roaster.toLowerCase().includes(searchLower) &&
            !p.origin?.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => b.aiScore - a.aiScore);

  const comparisonProducts = Array.from(comparison).map(id => products.find(p => p.id === id)).filter(Boolean) as CoffeeProduct[];

  // Calculate price range percentage for visual slider
  const priceRangePercent = {
    fillWidth: ((priceRange[1] - priceRange[0]) / 60) * 100,
    fillLeft: ((priceRange[0] - 15) / 60) * 100,
    handleLeft: ((priceRange[0] - 15) / 60) * 100,
    handleRight: ((75 - priceRange[1]) / 60) * 100,
  };

  const priceTrackStyle = {
    '--fill-width': `${priceRangePercent.fillWidth}%`,
    '--fill-left': `${priceRangePercent.fillLeft}%`,
    '--handle-left': `${priceRangePercent.handleLeft}%`,
    '--handle-right': `${priceRangePercent.handleRight}%`,
  } as React.CSSProperties;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between whitespace-nowrap border-b border-solid border-subtle-gray/60 dark:border-rich-brown/50 bg-background-light/80 dark:bg-background-dark/80 px-6 sm:px-8 lg:px-10 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-subtle-gray dark:hover:bg-rich-brown/50"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-rich-brown dark:text-cream" />
          </button>
          <Coffee className="text-primary text-3xl" />
          <h2 className="text-rich-brown dark:text-cream text-xl font-bold tracking-tight">KoffeeTrack</h2>
        </div>

        <div className="flex flex-1 justify-center px-8 max-w-lg">
          <div className="flex w-full items-stretch rounded-lg h-11">
            <div className="text-text-muted-light dark:text-text-muted-dark flex border-none bg-subtle-gray dark:bg-rich-brown/50 items-center justify-center pl-4 rounded-l-lg">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search by roaster or origin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex w-full min-w-0 flex-1 rounded-lg text-rich-brown dark:text-cream focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-subtle-gray dark:bg-rich-brown/50 h-full placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 rounded-l-none text-base font-normal"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {comparison.size > 0 && (
            <button
              onClick={() => setShowComparison(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold hover:bg-primary/20 transition-colors"
              aria-label={`Compare ${comparison.size} products`}
            >
              <BarChart3 className="w-4 h-4" />
              Compare ({comparison.size})
            </button>
          )}
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-gold-accent/50 bg-gradient-to-br from-primary/20 to-gold-accent/20"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow w-full max-w-screen-2xl mx-auto">
        <div className="flex">
          {/* Left Sidebar: Filter Panel */}
          <aside className={`sidebar w-80 flex-shrink-0 p-8 sticky top-[69px] h-[calc(100vh-69px)] overflow-y-auto ${sidebarOpen ? 'open' : ''} hidden md:block`}>
            <div className="flex flex-col gap-8">
              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Price Range</h3>
                <div className="relative flex w-full flex-col items-start justify-between gap-3">
                  <div className="flex h-[38px] w-full pt-1.5">
                    <div className="price-track flex h-1.5 w-full items-center rounded-full bg-subtle-gray dark:bg-rich-brown/50 relative" style={priceTrackStyle}>
                      <div className="price-track-fill price-fill"></div>
                      <div className="price-track-handle price-handle-left">
                        <div className="size-4 rounded-full bg-rich-brown dark:bg-cream ring-2 ring-white dark:ring-background-dark"></div>
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">${priceRange[0]}</p>
                      </div>
                      <div className="price-track-handle price-handle-right">
                        <div className="size-4 rounded-full bg-rich-brown dark:bg-cream ring-2 ring-white dark:ring-background-dark"></div>
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">${priceRange[1]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full gap-2">
                    <label className="flex-1">
                      <span className="sr-only">Minimum price</span>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full price-slider"
                        aria-label="Minimum price"
                      />
                    </label>
                    <label className="flex-1">
                      <span className="sr-only">Maximum price</span>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full price-slider"
                        aria-label="Maximum price"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Roast Level Filter */}
              <div>
                <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Roast Level</h3>
                <div className="flex flex-col gap-3">
                  {['Light', 'Medium', 'Dark'].map((level) => (
                    <label key={level} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roastLevels.has(level)}
                        onChange={() => toggleRoastLevel(level)}
                        className="form-checkbox rounded border-gray-300 dark:border-rich-brown/80 text-primary focus:ring-primary/50 bg-transparent"
                      />
                      <span className="text-base text-rich-brown dark:text-cream">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin Filter */}
              <div>
                <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Origin</h3>
                <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                  {allOrigins.slice(0, 10).map((origin) => (
                    <label key={origin} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={origins.has(origin)}
                        onChange={() => toggleOrigin(origin)}
                        className="form-checkbox rounded border-gray-300 dark:border-rich-brown/80 text-primary focus:ring-primary/50 bg-transparent"
                      />
                      <span className="text-base text-rich-brown dark:text-cream">{origin}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Flavor Profile Filter */}
              <div>
                <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Flavor Profile</h3>
                <div className="flex flex-wrap gap-2">
                  {['Fruity', 'Chocolatey', 'Nutty', 'Floral', 'Spicy', 'Citrus', 'Caramel'].map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => toggleFlavorProfile(flavor)}
                      className={`filter-chip ${flavorProfiles.has(flavor) ? 'active' : ''}`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="mt-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <aside
                className="sidebar w-80 h-full p-8 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-rich-brown dark:text-cream">Filters</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 rounded-lg hover:bg-subtle-gray dark:hover:bg-rich-brown/50"
                      aria-label="Close sidebar"
                    >
                      <X className="w-5 h-5 text-rich-brown dark:text-cream" />
                    </button>
                  </div>
                  {/* Same filter content as desktop - simplified for mobile */}
                  <div>
                    <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <div className="flex w-full gap-2">
                        <label className="flex-1">
                          <span className="sr-only">Minimum price</span>
                          <input
                            type="range"
                            min="15"
                            max="75"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full price-slider"
                            aria-label="Minimum price"
                          />
                        </label>
                        <label className="flex-1">
                          <span className="sr-only">Maximum price</span>
                          <input
                            type="range"
                            min="15"
                            max="75"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full price-slider"
                            aria-label="Maximum price"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Roast Level</h3>
                    <div className="flex flex-col gap-3">
                      {['Light', 'Medium', 'Dark'].map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={roastLevels.has(level)}
                            onChange={() => toggleRoastLevel(level)}
                            className="form-checkbox rounded border-gray-300 dark:border-rich-brown/80 text-primary focus:ring-primary/50 bg-transparent"
                          />
                          <span className="text-base text-rich-brown dark:text-cream">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Origin</h3>
                    <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                      {allOrigins.slice(0, 10).map((origin) => (
                        <label key={origin} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={origins.has(origin)}
                            onChange={() => toggleOrigin(origin)}
                            className="form-checkbox rounded border-gray-300 dark:border-rich-brown/80 text-primary focus:ring-primary/50 bg-transparent"
                          />
                          <span className="text-base text-rich-brown dark:text-cream">{origin}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rich-brown dark:text-cream mb-4">Flavor Profile</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Fruity', 'Chocolatey', 'Nutty', 'Floral', 'Spicy', 'Citrus', 'Caramel'].map((flavor) => (
                        <button
                          key={flavor}
                          onClick={() => toggleFlavorProfile(flavor)}
                          className={`filter-chip ${flavorProfiles.has(flavor) ? 'active' : ''}`}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity mt-4"
                  >
                    Apply Filters
                  </button>
                </div>
              </aside>
            </div>
          )}

          {/* Main Content Area: Product Grid */}
          <main className="flex-1 p-8 bg-background-light dark:bg-background-dark">
            <p className="text-rich-brown dark:text-cream text-4xl font-black leading-tight tracking-tight font-display mb-8">
              Premium Coffee Selections
            </p>

            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Coffee className="w-16 h-16 text-gold-accent mx-auto mb-4 animate-pulse" />
                  <p className="text-text-muted-light dark:text-text-muted-dark">Loading coffee...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group flex flex-col product-card"
                  >
                    {/* Wishlist & Comparison */}
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-soft transition-all ${
                          wishlist.has(product.id) ? 'text-red-500' : 'text-rich-brown/60'
                        }`}
                        aria-label={wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleComparison(product.id)}
                        className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-soft transition-all ${
                          comparison.has(product.id) ? 'text-primary' : 'text-rich-brown/60'
                        }`}
                        aria-label={comparison.has(product.id) ? 'Remove from comparison' : 'Add to comparison'}
                      >
                        {comparison.has(product.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <BarChart3 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="bg-subtle-gray dark:bg-rich-brown/50 p-6 flex justify-center items-center">
                      {product.imageUrl ? (
                        <img
                          className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          alt={`${product.name} by ${product.roaster}`}
                          src={product.imageUrl}
                        />
                      ) : (
                        <Coffee className="h-48 w-48 text-rich-brown/20 dark:text-cream/20" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {product.roaster}
                      </p>
                      <h4 className="text-lg font-bold text-rich-brown dark:text-cream mt-1 flex-grow">
                        {product.name}
                      </h4>
                      <div className="flex justify-between items-end mt-4">
                        <p className="font-display text-3xl font-bold text-rich-brown dark:text-cream">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="ai-score-badge">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-sm">{product.aiScore}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-center text-sm"
                        >
                          Buy Now
                        </a>
                        <button
                          onClick={() => shareProduct(product)}
                          className="p-2 rounded-lg border border-subtle-gray dark:border-rich-brown/50 hover:border-primary transition-colors"
                          aria-label="Share product"
                        >
                          <Share2 className="w-4 h-4 text-rich-brown dark:text-cream" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-32">
                <Coffee className="w-24 h-24 text-rich-brown/20 dark:text-cream/20 mx-auto mb-6" />
                <p className="text-xl font-bold text-rich-brown dark:text-cream mb-2">No coffee found</p>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setPriceRange([15, 75]);
                    setRoastLevels(new Set(['Light', 'Medium']));
                    setOrigins(new Set());
                    setFlavorProfiles(new Set());
                    setSearchTerm('');
                  }}
                  className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && comparisonProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-rich-brown/90 rounded-xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-rich-brown dark:text-cream">Compare Products</h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="p-2 rounded-lg hover:bg-subtle-gray dark:hover:bg-rich-brown/50"
                  aria-label="Close comparison"
                >
                  <X className="w-5 h-5 text-rich-brown dark:text-cream" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparisonProducts.map((product) => (
                  <div key={product.id} className="product-card p-4">
                    <h3 className="font-bold text-rich-brown dark:text-cream mb-2">{product.name}</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">{product.roaster}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted-light dark:text-text-muted-dark">Price:</span>
                        <span className="font-bold text-rich-brown dark:text-cream">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted-light dark:text-text-muted-dark">Price/oz:</span>
                        <span className="font-bold text-rich-brown dark:text-cream">${product.pricePerOz.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted-light dark:text-text-muted-dark">AI Score:</span>
                        <span className="font-bold text-rich-brown dark:text-cream">{product.aiScore}/100</span>
                      </div>
                    </div>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white font-bold w-full mt-4 py-2 rounded-lg text-center block hover:opacity-90 transition-opacity"
                    >
                      Buy Now
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-24 bg-rich-brown dark:bg-cream text-cream dark:text-rich-brown px-6 py-3 rounded-lg shadow-soft z-50"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
