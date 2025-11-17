'use client';

import { useEffect, useState } from 'react';
import { Coffee, Search, SlidersHorizontal, Bell, Home, Bookmark, User, RefreshCw } from 'lucide-react';

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

export default function CoffeeDeals() {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
  }, []);

  const filteredProducts = products
    .filter(p => {
      if (filter === 'deals') return p.aiScore > 75;
      if (filter === 'budget') return p.price <= 20;
      if (filter === 'premium') return p.price > 25;
      return true;
    })
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roaster.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5EFE6' }}>
      {/* Mobile Header - Matches Mockup */}
      <header className="bg-[#F5EFE6] px-5 py-4 flex items-center justify-between sticky top-0 z-10">
        <Coffee className="w-6 h-6" style={{ color: '#2D2D2D' }} />
        <h1 className="text-2xl font-bold" style={{ color: '#2D2D2D' }}>Deals</h1>
        <Bell className="w-6 h-6" style={{ color: '#2D2D2D' }} />
      </header>

      {/* Search Bar */}
      <div className="px-5 py-4 flex gap-3">
        <div className="flex-1 bg-white rounded-xl shadow-sm flex items-center px-4 h-[52px]">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search coffee or roaster..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: '#2D2D2D' }}
          />
        </div>
        <button className="bg-white rounded-xl shadow-sm w-[52px] h-[52px] flex items-center justify-center">
          <SlidersHorizontal className="w-5 h-5" style={{ color: '#2D2D2D' }} />
        </button>
      </div>

      {/* Category Chips - Horizontal Scroll */}
      <div className="px-5 flex gap-3 overflow-x-auto no-scrollbar pb-4">
        {[
          { id: 'all', label: '☕ All', emoji: '' },
          { id: 'deals', label: 'Best Deals🔥', emoji: '' },
          { id: 'budget', label: 'Budget💰', emoji: '' },
          { id: 'premium', label: 'Premium💎', emoji: '' },
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === category.id
                ? 'text-white shadow-md'
                : 'bg-white text-[#2D2D2D] border border-gray-200'
            }`}
            style={filter === category.id ? { backgroundColor: '#FF6B35' } : {}}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Product Grid - 2 Columns */}
      <main className="flex-1 px-5 py-2">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#FF6B35' }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-24">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Product Image with AI Badge */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Coffee className="w-16 h-16 text-gray-300" />
                  )}

                  {/* AI Score Badge - Top Right */}
                  <div
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm border-[3px] border-white shadow-md"
                    style={{ backgroundColor: '#4CAF50' }}
                  >
                    {product.aiScore}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-sm font-medium mb-1" style={{ color: '#757575' }}>
                    {product.roaster}
                  </p>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight" style={{ color: '#2D2D2D', fontFamily: 'Playfair Display, serif' }}>
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold mb-3" style={{ color: '#2D2D2D' }}>
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    className="w-full h-11 rounded-xl font-semibold text-white transition-all active:scale-95"
                    style={{ backgroundColor: '#FF6B35' }}
                    onClick={() => window.open(product.link, '_blank')}
                  >
                    View Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No coffee found</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation - Matches Mockup */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          <button className="flex flex-col items-center justify-center gap-1 min-w-[60px]">
            <Home className="w-6 h-6" style={{ color: '#FF6B35' }} />
            <span className="text-xs font-medium" style={{ color: '#FF6B35' }}>Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 min-w-[60px]">
            <Bookmark className="w-6 h-6" style={{ color: '#9E9E9E' }} />
            <span className="text-xs font-medium" style={{ color: '#9E9E9E' }}>Watchlist</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 min-w-[60px]">
            <User className="w-6 h-6" style={{ color: '#9E9E9E' }} />
            <span className="text-xs font-medium" style={{ color: '#9E9E9E' }}>Profile</span>
          </button>
        </div>
      </nav>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
