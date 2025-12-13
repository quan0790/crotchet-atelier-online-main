// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import logo from '@/assets/logo.jpg';

export function Footer() {
  const year = new Date().getFullYear();

  // Socials
  const socials = [
    { icon: <Instagram className="h-4 w-4" />, href: 'https://www.instagram.com/crochets_atelier?igsh=MXF0enNuMm9nczl4ZA==', name: 'Instagram' },
    { icon: <FaTiktok className="h-4 w-4" />, href: 'https://www.tiktok.com/@becky_kay14?_r=1&_t=ZM-91xIhcAIg5T', name: 'TikTok' },
    { icon: <FaWhatsapp className="h-4 w-4" />, href: 'https://wa.me/254708353369', name: 'WhatsApp' },
  ];

  // Quick links dynamically
  const quickLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'New Arrivals', href: `/shop?filter=new` },
    { name: 'Best Sellers', href: `/shop?filter=bestsellers` },
    { name: 'On Sale', href: `/shop?filter=onsale` },
    { name: 'Gift Cards', href: '/gift-cards' },
  ];

  // Categories dynamically based on products
  const activeCategories = categories.filter(cat =>
    products.some(p => p.category === cat.id)
  );

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <Link to="/" className="block w-32">
              <img src={logo} alt="Crotchet Atelier" className="w-full h-auto rounded-lg" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Each piece tells a story. We create timeless crochet treasures that bring warmth and beauty to your life.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3 text-sm">
              {activeCategories.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Kasarani, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+254708353369</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@crotchetatelier.com</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-10 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Email address"
                />
                <Button size="sm" className="h-10">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {year} Crotchet Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
