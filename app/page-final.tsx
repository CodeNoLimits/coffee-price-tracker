'use client';

import { useEffect, useState } from 'react';
import {
  Coffee,
  Search,
  SlidersHorizontal,
  Bell,
  Home,
  Bookmark,
  User,
  RefreshCw,
} from 'lucide-react';

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
    .filter((p) => {
      if (filter === 'deals') return p.aiScore > 75;
      if (filter === 'budget') return p.price <= 20;
      if (filter === 'premium') return p.price > 25;
      return true;
    })
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.roaster.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex flex-col bg-background-dark/80 backdrop-blur-sm pt-4">
        <div className="flex items-center px-4 pb-2 justify-between">
          <div className="text-background-light flex size-12 shrink-0 items-center">
            <Coffee className="w-8 h-8" />
          </div>
          <h1 className="text-background-light text-xl font-bold font-body leading-tight tracking-[-0.015em] flex-1 text-center">
            Deals
          </h1>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-transparent text-background-light">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Sticky */}
      <div className="px-4 py-3 sticky top-[68px] z-10 bg-background-dark/80 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <label className="flex flex-col min-w-40 h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
              <div className="text-text-secondary flex border border-r-0 border-border-dark bg-surface-dark items-center justify-center pl-4 rounded-l-xl">
                <Search className="w-5 h-5" />
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-background-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-l-0 border-border-dark bg-surface-dark h-full placeholder:text-text-secondary px-4 text-base font-normal leading-normal font-body"
                placeholder="Search coffee or roaster..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </label>
          <button className="flex items-center justify-center h-14 w-14 shrink-0 rounded-xl bg-surface-dark text-background-light shadow-sm border border-border-dark">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Chips - Horizontal Scroll */}
      <div className="px-4">
        <div className="flex gap-3 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { id: 'all', label: 'All' },
            { id: 'deals', label: 'Best Deals🔥' },
            { id: 'budget', label: 'Budget💰' },
            { id: 'premium', label: 'Premium⭐' },
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full pl-5 pr-5 transition-all ${
                filter === category.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-dark text-background-light border border-border-dark'
              }`}
            >
              <p
                className={`text-sm ${
                  filter === category.id ? 'font-bold' : 'font-medium'
                } leading-normal`}
              >
                {category.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 pb-24">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-xl bg-surface-dark p-3 shadow-md border border-border-dark hover:shadow-lg transition-shadow"
            >
              {/* Product Image with AI Badge */}
              <div className="relative">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{
                    backgroundImage: product.imageUrl
                      ? `url("${product.imageUrl}")`
                      : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                  }}
                >
                  {!product.imageUrl && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Coffee className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* AI Score Badge */}
                <div className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-sm">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${getScoreBadgeColor(
                      product.aiScore
                    )} text-sm font-bold text-white`}
                  >
                    {product.aiScore}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <p className="text-text-secondary text-sm font-medium leading-normal">
                  {product.roaster}
                </p>
                <p className="text-background-light text-base font-bold font-body leading-tight mt-1 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-background-light text-2xl font-bold font-display mt-auto pt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => window.open(product.link, '_blank')}
                className="w-full rounded-lg bg-primary h-11 text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Buy
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-20">
            <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-text-secondary">No coffee found</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-border-dark bg-background-dark/80 backdrop-blur-sm px-4 pb-3 pt-2">
        <a
          className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
          href="#"
        >
          <div className="flex h-8 items-center justify-center">
            <Home className="w-6 h-6 fill-current" />
          </div>
          <p className="text-xs font-bold leading-normal tracking-[0.015em]">
            Home
          </p>
        </a>
        <a
          className="flex flex-1 flex-col items-center justify-end gap-1 text-text-secondary"
          href="#"
        >
          <div className="flex h-8 items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">
            Watchlist
          </p>
        </a>
        <a
          className="flex flex-1 flex-col items-center justify-end gap-1 text-text-secondary"
          href="#"
        >
          <div className="flex h-8 items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <p className="text-xs font-medium leading-normal tracking-[0.015em]">
            Profile
          </p>
        </a>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
