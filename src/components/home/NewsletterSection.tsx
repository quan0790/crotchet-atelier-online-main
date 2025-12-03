import { useState } from 'react';
import { Mail, Sparkles, Instagram, Twitter } from 'lucide-react';
import { FaTiktok, FaSnapchatGhost, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const socials = [
    { icon: <FaWhatsapp className="h-4 w-4" />, href: 'https://wa.me/254790264792', name: 'WhatsApp', hover: 'text-green-500' },
    { icon: <Instagram className="h-4 w-4" />, href: 'https://www.instagram.com/crochets_atelier', name: 'Instagram', hover: 'text-pink-500' },
    { icon: <FaTiktok className="h-4 w-4" />, href: 'https://www.tiktok.com/@crochets_atelier', name: 'TikTok', hover: 'text-black' },
    { icon: <Twitter className="h-4 w-4" />, href: 'https://twitter.com/crochets_atelier', name: 'X', hover: 'text-blue-500' },
    { icon: <FaSnapchatGhost className="h-4 w-4" />, href: 'https://www.snapchat.com', name: 'Snapchat', hover: 'text-yellow-400' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to our community! 🧶",
        description: "You'll receive updates on new collections and exclusive offers.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-accent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4 text-primary" />
          Join Our Community
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Stay in the Loop
        </h2>

        <p className="text-muted-foreground text-lg mb-8">
          Subscribe for exclusive offers, new arrivals, and behind-the-scenes peeks at our latest creations.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <Button type="submit" variant="hero" size="lg">
            Subscribe
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground mb-4">
            Follow us to get updates, promotions, and direct communication for your custom orders!
          </p>

          <div className="flex justify-center items-center gap-4 mt-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-9 w-9 flex items-center justify-center rounded-full bg-card hover:bg-primary/10 transition-colors ${social.hover}`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
