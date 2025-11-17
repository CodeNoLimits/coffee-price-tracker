'use client';

import { useEffect, useState } from 'react';
import { Coffee, TrendingDown, Sparkles, RefreshCw, Filter, Search } from 'lucide-react';

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
    // Auto-refresh every hour
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
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coffee className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Coffee Price Tracker</h1>
                <p className="text-amber-100 text-sm">AI-Powered Best Deals Finder</p>
              </div>
            </div>
            <button
              onClick={fetchCoffee}
              disabled={loading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
          {lastUpdated && (
            <p className="text-amber-200 text-xs mt-2">Last updated: {lastUpdated}</p>
          )}
        </div>
      </header>

      {/* Top Deal Banner */}
      {topDeal && !loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-xl font-bold">🏆 Best Deal Right Now</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{topDeal.name}</h3>
                <p className="text-green-100">by {topDeal.roaster} • AI Score: {topDeal.aiScore}/100</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${topDeal.price}</div>
                <div className="text-green-100 text-sm">${topDeal.pricePerOz}/oz • {topDeal.weight}</div>
                <a
                  href={topDeal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all"
                >
                  Buy Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search coffee, roaster, or origin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            >
              <option value="score">Best Score</option>
              <option value="price">Lowest Price</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            {['all', 'deals', 'budget', 'premium'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f === 'all' && '☕ All Coffee'}
                {f === 'deals' && '🔥 Best Deals'}
                {f === 'budget' && '💰 Budget ($0-20)'}
                {f === 'premium' && '⭐ Premium ($25+)'}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredProducts.length} products found</span>
            <span className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-green-600" />
              Prices updated hourly
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading best coffee deals...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* AI Badge */}
                {product.aiScore > 75 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 absolute m-3 rounded-full flex items-center gap-1 z-10">
                    <Sparkles className="w-3 h-3" />
                    {product.recommendation}
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <Coffee className="w-16 h-16 text-amber-600 opacity-50" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">by {product.roaster}</p>
                    </div>
                    <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">
                      {product.aiScore}/100
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Origin:</span>
                      <span className="font-medium text-gray-900">{product.origin}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Roast:</span>
                      <span className="font-medium text-gray-900">{product.roastLevel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium text-gray-900">
                        ⭐ {product.rating?.toFixed(1)}/5.0
                      </span>
                    </div>
                  </div>

                  {/* Flavor Notes */}
                  {product.flavorNotes && product.flavorNotes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.flavorNotes.slice(0, 3).map((note) => (
                        <span
                          key={note}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                      <div className="text-xs text-gray-500">
                        ${product.pricePerOz}/oz • {product.weight}
                      </div>
                    </div>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No coffee found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Prices updated automatically every hour • AI-powered recommendations
          </p>
          <p className="text-xs mt-2">
            Built with ❤️ and ☕ • Data from premium coffee roasters
          </p>
        </div>
      </footer>
    </main>
  );
}
