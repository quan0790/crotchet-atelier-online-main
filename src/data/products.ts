// src/data/products.ts
import crochetToteBag from '../assets/products/crochet-tote-bag.jpg';
import crochetCardigan from '../assets/products/crochet-cardigan.jpg';
import crochetRoses from '../assets/products/crochet-roses.jpg';
import crochetBunny from '../assets/products/crochet-bunny.jpg';
import crochetWallHanging from '../assets/products/crochet-wall-hanging.jpg';
import crochetScrunchies from '../assets/products/crochet-scrunchies.jpg';
import crochetMarketBag from '../assets/products/crochet-market-bag.jpg';
import crochetBlanket from '../assets/products/crochet-blanket.jpg';
import crochetBears from '../assets/products/crochet-bears.jpg';
import crochetCropTop from '../assets/products/crochet-crop-top.jpg';
import crochetTulips from '../assets/products/crochet-tulips.jpg';
import crochetCoasters from '../assets/products/crochet-coasters.jpg';

// ✅ Type definitions
export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;         // Price in KES
  originalPrice?: number; // Original price in KES
  category: string;
  images: string[];
  materials: string[];
  sizes?: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  featured?: boolean;
  isNew?: boolean;
};

// ✅ Categories array
export const categories: Category[] = [
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'flowers', name: 'Flowers', icon: '🌹' },
  { id: 'toys', name: 'Toys', icon: '🧸' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'accessories', name: 'Accessories', icon: '🎀' },
];

// ✅ Products array (all prices in KES)
export const products: Product[] = [
  { id: '1', name: 'Rose Garden Tote Bag', description: 'A stunning handcrafted tote bag featuring intricate rose patterns.', price: 1500, originalPrice: 2000, category: 'bags', images: [crochetToteBag], materials: ['100% Cotton Yarn', 'Handmade Rose Appliqués'], colors: ['Blush Pink', 'Cream', 'Sage'], inStock: true, rating: 4.9, reviews: 47, featured: true },
  { id: '2', name: 'Cozy Cable Knit Cardigan', description: 'Wrap yourself in warmth with this beautifully crafted cardigan.', price: 3000, category: 'clothing', images: [crochetCardigan], materials: ['Merino Wool Blend', 'Acrylic'], sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Cream/Sage', 'Dusty Rose', 'Natural'], inStock: true, rating: 4.8, reviews: 32, featured: true },
  { id: '3', name: 'Forever Roses Bouquet', description: 'A timeless bouquet of handcrafted crochet roses.', price: 1200, category: 'flowers', images: [crochetRoses], materials: ['Cotton Yarn', 'Floral Wire', 'Satin Ribbon'], colors: ['Pink Mix', 'Peach', 'White', 'Red'], inStock: true, rating: 5.0, reviews: 89, featured: true, isNew: true },
  { id: '4', name: 'Sweet Bunny Amigurumi', description: 'Meet this adorable handmade bunny!', price: 800, category: 'toys', images: [crochetBunny], materials: ['Organic Cotton', 'Polyester Stuffing', 'Safety Eyes'], colors: ['Pink', 'Gray', 'Brown', 'White'], inStock: true, rating: 4.9, reviews: 156, featured: true },
  { id: '5', name: 'Bohemian Wall Hanging', description: 'Add a touch of handmade charm to your walls.', price: 1000, category: 'home', images: [crochetWallHanging], materials: ['Cotton Macramé Cord', 'Natural Wooden Dowel'], colors: ['Natural', 'White', 'Cream'], inStock: true, rating: 4.7, reviews: 28 },
  { id: '6', name: 'Daisy Chain Scrunchie Set', description: 'A delightful set of handcrafted scrunchies.', price: 350, category: 'accessories', images: [crochetScrunchies], materials: ['Soft Cotton Blend', 'Elastic Band'], colors: ['Pastel Mix', 'Earth Tones', 'Bright Mix'], inStock: true, rating: 4.8, reviews: 67, isNew: true },
  { id: '7', name: 'Eco Market Bag', description: 'Eco-friendly and stylish mesh market bag.', price: 900, category: 'bags', images: [crochetMarketBag], materials: ['100% Cotton', 'Reinforced Handles'], colors: ['Natural', 'Sage', 'Terracotta'], inStock: true, rating: 4.6, reviews: 41 },
  { id: '8', name: 'Granny Square Blanket', description: 'A cozy, colorful granny square blanket.', price: 3500, originalPrice: 3500, category: 'home', images: [crochetBlanket], materials: ['Acrylic Wool Blend'], sizes: ['Throw (50x60")', 'Twin (60x80")', 'Queen (80x90")'], colors: ['Rainbow Pastels', 'Earth Tones', 'Monochrome'], inStock: true, rating: 4.9, reviews: 73, featured: true },
  { id: '9', name: 'Teddy Bear Family Set', description: 'An adorable family of handcrafted teddy bears.', price: 1400, category: 'toys', images: [crochetBears], materials: ['Organic Cotton', 'Polyester Fill', 'Embroidered Features'], colors: ['Brown/Cream', 'Gray', 'Pink'], inStock: true, rating: 5.0, reviews: 44, isNew: true },
  { id: '10', name: 'Summer Lace Crop Top', description: 'Light and breezy lace crop top.', price: 1100, category: 'clothing', images: [crochetCropTop], materials: ['Cotton Blend'], sizes: ['XS', 'S', 'M', 'L'], colors: ['White', 'Blush', 'Sky Blue', 'Mint'], inStock: true, rating: 4.7, reviews: 29 },
  { id: '11', name: 'Spring Tulip Arrangement', description: 'A cheerful arrangement of crochet tulips.', price: 950, category: 'flowers', images: [crochetTulips], materials: ['Cotton Yarn', 'Wire Stems', 'Terracotta Pot'], colors: ['Mixed Bright', 'Pink', 'Yellow', 'White'], inStock: true, rating: 4.8, reviews: 52 },
  { id: '12', name: 'Scalloped Coaster Set', description: 'Set of 6 handmade scalloped crochet coasters.', price: 650, category: 'home', images: [crochetCoasters], materials: ['100% Cotton'], colors: ['Pastel Set', 'Neutral Set', 'Colorful Set'], inStock: true, rating: 4.6, reviews: 38 },
];
