import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const categoryImages = {
  bags: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
  flowers: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
  toys: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  home: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?w=400&h=400&fit=crop',
  accessories: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=400&fit=crop',
};

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-serif font-bold">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect handcrafted piece for every occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all">
                <img
                  src={categoryImages[category.id] || categoryImages.bags}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <span className="font-medium group-hover:text-primary transition-colors">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
