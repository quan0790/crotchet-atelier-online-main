import React, { useMemo, useState } from 'react';
import { ArrowRight, Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';

// Categories

const categories = [
  { id: 'bags', name: 'Bags', icon: '👜', description: 'Handcrafted crochet bags for every occasion' },
  { id: 'clothing', name: 'Clothing', icon: '👗', description: 'Cozy wearable crochet pieces' },
  { id: 'flowers', name: 'Flowers', icon: '🌸', description: 'Everlasting crochet bouquets' },
  { id: 'toys', name: 'Toys', icon: '🧸', description: 'Adorable amigurumi friends' },
  { id: 'home', name: 'Home Decor', icon: '🏠', description: 'Beautiful pieces for your space' },
  { id: 'accessories', name: 'Accessories', icon: '🎀', description: 'Charming crochet accessories' },
];

const categoryImages = {
  bags: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
  flowers: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop',
  toys: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  home: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?w=800&h=600&fit=crop',
  accessories: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&h=600&fit=crop',
};

// Price ranges in KES
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 500', min: 0, max: 500 },
  { label: '500 - 1000', min: 500, max: 1000 },
  { label: '1000 - 2000', min: 1000, max: 2000 },
  { label: 'Over 2000', min: 2000, max: 3500 },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpecial, setSelectedSpecial] = useState('');
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const { formatPrice } = useCurrency();

  const priceLabels = priceRanges.map((range) => ({
    ...range,
    label: range.label.replace(/(\d+)/g, (match) => formatPrice(parseInt(match, 10))),
  }));

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') filtered = filtered.filter((p) => p.category === selectedCategory);

    const priceRange = priceRanges[selectedPriceIndex];
    filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    if (selectedSpecial === 'new') filtered = filtered.filter((p) => p.isNew);
    if (selectedSpecial === 'bestsellers') filtered = filtered.filter((p) => p.featured);

    switch (selectedSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, selectedSpecial, selectedPriceIndex, selectedSort]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect handmade piece for yourself or a loved one. Browse our curated collections, or explore by category.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedSpecial('');
                setSelectedPriceIndex(0);
              }}
              className={cn(
                'group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:scale-[1.02]',
                selectedCategory === category.id && 'ring-2 ring-primary'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={categoryImages[category.id]}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h2 className="font-serif text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-white/80 text-sm mb-3">{category.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setGridCols(3)}
                className={cn('p-2 rounded-md', gridCols === 3 && 'bg-muted' )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn('p-2 rounded-md', gridCols === 4 && 'bg-muted' )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="h-10 px-4 pr-8 rounded-lg border border-border bg-card text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={cn('w-64 space-y-6', showFilters && 'block' )}>
            {/* Special Filters */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Special</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSpecial('new')}
                  className={cn(
                    'w-full text-left px-4 py-2 rounded-lg text-sm',
                    selectedSpecial === 'new' && 'bg-primary/10 text-primary font-medium' )}
                >
                  ✨ New Arrivals
                </button>
                <button
                  onClick={() => setSelectedSpecial('bestsellers')}
                  className={cn(
                    'w-full text-left px-4 py-2 rounded-lg text-sm',
                    selectedSpecial === 'bestsellers' && 'bg-primary/10 text-primary font-medium' )}
                >
                  🔥 Best Sellers
                </button>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceLabels.map((range, index) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceIndex(index)}
                    className={cn(
                      'w-full text-left px-4 py-2 rounded-lg text-sm',
                      selectedPriceIndex === index && 'bg-primary/10 text-primary font-medium' )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-6',
                  gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
                  'grid-cols-1 sm:grid-cols-2'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found matching your filters.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSpecial('');
                    setSelectedPriceIndex(0);
                    setSelectedSort('featured');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
