import { useState } from 'react';
import { Mail, Sparkles, Instagram } from 'lucide-react';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const socials = [
    {
      icon: <FaWhatsapp className="h-4 w-4" />,
      href: 'https://wa.me/254708353369',
      name: 'WhatsApp',
      hover: 'text-green-500'
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: 'https://www.instagram.com/crochets_atelier?igsh=MXF0enNuMm9nczl4ZA==',
      name: 'Instagram',
      hover: 'text-pink-500'
    },
    {
      icon: <FaTiktok className="h-4 w-4" />,
      href: 'https://www.tiktok.com/@becky_kay14?_r=1&_t=ZM-91xIhcAIg5T',
      name: 'TikTok',
      hover: 'text-black'
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "You'll receive updates on new collections and exclusive offers.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-bold mb-3 font-heading">Stay in the Loop</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Join our newsletter for exclusive offers, new arrivals, and behind-the-scenes peeks at our latest creations.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <Button type="submit" variant="default" size="lg" className="h-12 px-8 rounded-xl font-medium">
            Subscribe
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Follow us to get updates, promotions, and direct communication for your custom orders!
          </p>

          <div className="flex justify-center items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-10 w-10 flex items-center justify-center rounded-full bg-background border hover:border-primary/50 hover:shadow-md transition-all duration-300 ${social.hover}`}
                aria-label={social.name}
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
