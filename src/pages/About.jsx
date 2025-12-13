import { Heart, Leaf, Users, Award } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import artisanImage from '@/assets/WhatsApp Image 2025-12-03 at 00.44.43_d9a4a0cb.jpg'; // <- import your image

const values = [
  {
    icon: Heart,
    title: 'Crafted with Soul',
    description:
      'Every piece is more than handmade—it’s heart-made. We slow down, breathe life into every loop, and create art meant to be felt.',
  },
  {
    icon: Leaf,
    title: 'Earth-Conscious',
    description:
      'Sustainability is not a trend for us—it’s a promise. We choose eco-friendly materials and low-waste production from start to finish.',
  },
  {
    icon: Users,
    title: 'Rooted in Community',
    description:
      'We empower local artisans, share skills with upcoming creators, and build a space where creativity and culture thrive.',
  },
  {
    icon: Award,
    title: 'Quality in Every Thread',
    description:
      'Every item is carefully inspected and held to the highest standards—because handmade should never mean anything less than exceptional.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              About Crotchet Atelier
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shaped by culture, and powered by the belief that handmade pieces
              carry a touch of something magical.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                <img
                  src={artisanImage} // <- using imported image
                  alt="Artisan at work"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Story Content */}
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
                Our Journey
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What began in 2021 quiet creative escape—just a hook,
                  a ball of yarn, and a big dream—has grown into a vibrant
                  atelier fueled by passion and community.
                </p>
                <p>
                  Inspired by the nostalgic warmth of handcrafted treasures,
                  our founder poured countless nights into perfecting each
                  stitch. What started in a tiny living-room corner soon caught
                  the attention of friends, then strangers, and eventually
                  customers from across the world.
                </p>
                <p>
                  Today, Crotchet Atelier is home to a small but fiercely
                  dedicated team of artisans. Every piece we create carries a
                  story—of patience, culture, and connection. In a world racing
                  toward mass production, we choose to slow down and make
                  things that truly matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values guide every decision, every stitch, and every
              creation that leaves our atelier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-muted/50 rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover handcrafted pieces made with intention, culture, and heart.
            </p>
            <Link to="/shop">
              <Button variant="hero" size="xl">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
