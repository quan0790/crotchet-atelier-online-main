import { Link } from 'react-router-dom';
import { Heart, Leaf, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import artisanImage2 from '@/assets/WhatsApp Image 2025-12-03 at 00.44.44_e16de724.jpg'; // <- import your image

const features = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every stitch is crafted with care and attention to detail.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'We use eco-friendly yarns and natural materials whenever possible.',
  },
  {
    icon: Clock,
    title: 'Timeless Designs',
    description: 'Our pieces are designed to be cherished for years to come.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Each item undergoes careful quality checks before shipping.',
  },
];

export function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card transform transition-transform duration-500 group-hover:scale-105">
              <img
                src={artisanImage2} // <- using imported image
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-lg p-6 max-w-xs hidden md:block transform transition-transform duration-500 group-hover:translate-y-[-10px] animate-float">
              <p className="font-serif text-xl font-semibold text-foreground mb-2">
                "Each piece carries a story"
              </p>
              <p className="text-sm text-muted-foreground">— Becky Kituyi - Founder</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
              Crafted by Hand,
              <br />
              Made for You
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Crochet Atelier began as a passion project in a small studio, where every creation was born from a love of traditional craftsmanship. Today, we continue that legacy, bringing handmade beauty to homes around the world.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-3 p-4 rounded-2xl bg-card shadow-card transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
