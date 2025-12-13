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
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first">
             <img src={artisanImage2} alt="Artisan working" className="object-cover w-full h-full" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Handcrafted
              <br />
              Made for You
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Crochet Atelier began passion project in a small studio, where every creation was born from a love of traditional craftsmanship. Today, we continue that legacy, bringing handmade beauty to homes around the world.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-3 p-4 rounded-2xl bg-card shadow-card transition-transform duration-300 hover:scale-105"
                >
                  <div className="shrink-0 text-primary">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {feature.description}
                    </p>
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
