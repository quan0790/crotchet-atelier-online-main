import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/context/CurrencyContext';

// Lightbox imports
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency, conversionRate } = useCurrency();

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    </Layout>
  );

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
  };

  const handleToggleWishlist = () => {
    const inWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${inWishlist ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const formattedPrice = new Intl.NumberFormat(
    currency === "KES" ? "en-KE" : "en-US",
    { style: "currency", currency, minimumFractionDigits: 0 }
  ).format(product.price * conversionRate);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat(currency === "KES" ? "en-KE" : "en-US", { style: "currency", currency, minimumFractionDigits: 0 })
        .format(product.originalPrice * conversionRate)
    : null;

  const isOnSale = !!product.originalPrice && product.originalPrice > product.price;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div 
              className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden mb-6 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                      selectedImage === index ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted")}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">{formattedPrice}</span>
              {isOnSale && (
                <>
                  <span className="text-xl text-muted-foreground line-through">{formattedOriginalPrice}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                    Save {currency === "KES" ? Math.round((product.originalPrice - product.price) * conversionRate) : `$${(product.originalPrice - product.price).toFixed(2)}`}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Size</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Colors */}
            {product.colors && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Color</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>-</Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>+</Button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button
                variant={isInWishlist(product.id) ? "destructive" : "outline"}
                size="icon"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={product.images.map(img => ({ src: img }))}
          plugins={[Zoom, Thumbnails]}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
