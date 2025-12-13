import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom, Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// ✅ Use relative paths with no spaces
import Hero1 from '../../assets/products/dress.jpg';
import Hero2 from '../../assets/products/bikiniset.jpg';
import Hero3 from '../../assets/products/becky.jpg';
import Hero4 from '../../assets/products/bag1.jpg';
import Hero5 from '../../assets/products/bag2.jpg';
import Hero6 from '../../assets/products/dress2.jpg';
import HeroMobile from '../../assets/products/dress2.jpg';

export function HeroSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6];

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
           <h1 className="text-4xl md:text-6xl font-bold mb-6">
             <span className="text-primary">Handmade</span> with Love
           </h1>
           <p className="text-xl text-muted-foreground mb-8">
             Handmade crochet creations designed to bring warmth, beauty, and craftsmanship to your world.
           </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Link to="/categories">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* IMAGE GRID */}
          <div className="relative z-10 hidden lg:block">
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => { setSelectedImage(i); setIsLightboxOpen(true); }}
                >
                  <img
                    src={img}
                    alt={`Crochet item ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE HERO IMAGE */}
          <div className="lg:hidden relative z-10">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card cursor-pointer"
                 onClick={() => { setSelectedImage(0); setIsLightboxOpen(true); }}>
              <img
                src={HeroMobile}
                alt="Crochet mobile"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={images.map(img => ({ src: img }))}
          plugins={[Zoom, Thumbnails]}
          index={selectedImage}
        />
      )}
    </section>
  );
}
