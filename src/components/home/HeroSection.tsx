import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="relative z-10 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Handcrafted with Love
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Artisan</span>
              <br />
              <span className="text-primary">Crochet</span>
              <br />
              <span className="text-foreground">Treasures</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover unique, handmade crochet creations that bring warmth, beauty, and a touch of artisan craftsmanship to your world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mt-12">
              {[
                { value: '100+', label: 'Happy Customers' },
                { value: '100%', label: 'Handmade' },
                { value: '25+', label: 'Unique Designs' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative z-10 hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop"
                    alt="Crochet bag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
                    alt="Crochet toy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <img
                    src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop"
                    alt="Crochet flowers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-card animate-float" style={{ animationDelay: '2s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop"
                    alt="Crochet clothing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero Image */}
          <div className="lg:hidden relative z-10">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop"
                alt="Handcrafted crochet items"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
