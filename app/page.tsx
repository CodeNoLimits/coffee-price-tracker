'use client';

import { useEffect, useState } from 'react';
import { Coffee, TrendingDown, Sparkles, RefreshCw, Filter, Search, Star, MapPin, Flame } from 'lucide-react';
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
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'name'>('score');

  const fetchCoffee = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/coffee');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setLastUpdated(new Date(data.lastUpdated).toLocaleTimeString());
      }
    } catch (error) {
      console.error('Failed to fetch coffee:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffee();
    const interval = setInterval(fetchCoffee, 3600000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products
    .filter(p => {
      if (filter === 'deals') return p.aiScore > 75;
      if (filter === 'premium') return p.price > 25;
      if (filter === 'budget') return p.price <= 20;
      return true;
    })
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roaster.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.origin?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'score') return b.aiScore - a.aiScore;
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  const topDeal = filteredProducts[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header with Glassmorphism */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative backdrop-blur-xl bg-gradient-to-r from-amber-900/95 via-orange-900/95 to-amber-800/95 border-b border-amber-800/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full"></div>
                <Coffee className="w-12 h-12 text-amber-300 relative z-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-100 to-orange-100 bg-clip-text text-transparent">
                  Coffee Price Tracker
                </h1>
                <p className="text-amber-200/90 text-sm font-medium mt-1">AI-Powered Best Deals Finder</p>
              </div>
            </motion.div>
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={fetchCoffee}
              disabled={loading}
              className="group relative overflow-hidden backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline font-medium">Refresh</span>
              </div>
            </motion.button>
          </div>
          {lastUpdated && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-amber-200/80 text-xs mt-3 font-medium"
            >
              Last updated: {lastUpdated}
            </motion.p>
          )}
        </div>
      </motion.header>

      {/* Top Deal Banner with Premium Design */}
      <AnimatePresence>
        {topDeal && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
          >
            <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl border border-emerald-400/20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">🏆 Best Deal Right Now</h2>
                    <p className="text-emerald-100/90 text-sm">Highest AI Score • Best Value</p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{topDeal.name}</h3>
                    <p className="text-emerald-100/90 text-lg mb-3">by {topDeal.roaster}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold">AI Score: {topDeal.aiScore}/100</span>
                      </div>
                      {topDeal.origin && (
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <MapPin className="w-4 h-4" />
                          <span>{topDeal.origin}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right lg:text-left lg:ml-8">
                    <div className="text-5xl font-bold mb-2">${topDeal.price}</div>
                    <div className="text-emerald-100/90 text-sm mb-4">${topDeal.pricePerOz}/oz • {topDeal.weight}</div>
                    <a
                      href={topDeal.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      Buy Now
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Search with Glassmorphism */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-8 border border-white/20 space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-600 transition-colors" />
              <input
                type="text"
                placeholder="Search coffee, roaster, or origin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md font-medium"
            >
              <option value="score">Best Score</option>
              <option value="price">Lowest Price</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gray-500" />
            {[
              { id: 'all', label: '☕ All Coffee', icon: Coffee },
              { id: 'deals', label: '🔥 Best Deals', icon: Flame },
              { id: 'budget', label: '💰 Budget ($0-20)', icon: null },
              { id: 'premium', label: '⭐ Premium ($25+)', icon: Star },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`group relative overflow-hidden px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    filter === f.id
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                  }`}
                >
                  {filter === f.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 animate-pulse"></div>
                  )}
                  <span className="relative flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {f.label.replace(/[☕🔥💰⭐]/g, '').trim()}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
            <span className="font-medium">{filteredProducts.length} products found</span>
            <span className="flex items-center gap-2 text-emerald-600 font-medium">
              <TrendingDown className="w-4 h-4" />
              Prices updated hourly
            </span>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 relative z-10">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-32"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Coffee className="w-16 h-16 text-amber-600 mx-auto mb-6" />
              </motion.div>
              <p className="text-gray-600 text-lg font-medium">Loading best coffee deals...</p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
                    {/* AI Badge */}
                    {product.aiScore > 75 && (
                      <div className="absolute top-4 left-4 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500 blur-md opacity-50"></div>
                          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            {product.recommendation}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Placeholder with Gradient */}
                    <div className="relative h-56 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Coffee className="w-20 h-20 text-amber-600/40 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {product.aiScore > 75 && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <span className="text-emerald-600 font-bold text-sm">{product.aiScore}/100</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-2">
                          <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium">by {product.roaster}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {product.origin && (
                          <div className="bg-amber-50/50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Origin</div>
                            <div className="font-semibold text-gray-900">{product.origin}</div>
                          </div>
                        )}
                        {product.roastLevel && (
                          <div className="bg-orange-50/50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Roast</div>
                            <div className="font-semibold text-gray-900">{product.roastLevel}</div>
                          </div>
                        )}
                      </div>

                      {product.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Flavor Notes */}
                      {Array.isArray(product.flavorNotes) && product.flavorNotes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {product.flavorNotes.slice(0, 3).map((note, noteIdx) => (
                            <span
                              key={noteIdx}
                              className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 px-3 py-1.5 rounded-full font-medium border border-amber-200/50"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price & CTA */}
                      <div className="border-t border-gray-200 pt-5 flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">${product.price}</div>
                          <div className="text-xs text-gray-500 font-medium">
                            ${product.pricePerOz}/oz • {product.weight}
                          </div>
                        </div>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                          <span className="relative">Buy Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <Coffee className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-lg font-medium mb-4">No coffee found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 border-t border-gray-800/50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-amber-400" />
            <p className="text-gray-300 text-sm font-medium">
              Prices updated automatically every hour • AI-powered recommendations
            </p>
          </div>
          <p className="text-gray-500 text-xs">
            Built with ❤️ and ☕ • Data from premium coffee roasters
          </p>
        </div>
      </footer>
    </main>
  );
}
