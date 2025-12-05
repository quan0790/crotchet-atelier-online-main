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
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isInWishlist(product.id) ? "removed from" : "added to"} your wishlist.`,
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
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div
              className="aspect-square rounded-3xl overflow-hidden bg-muted cursor-zoom-in"
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
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
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
                  <span className="px-3 py-1 bg-rose text-rose-foreground text-sm font-medium rounded-full">
                    Save {currency === "KES" ? Math.round((product.originalPrice - product.price) * conversionRate) : `$${(product.originalPrice - product.price).toFixed(2)}`}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Size:</label>
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="border rounded-md p-2 w-full"
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
                <label className="block mb-2 font-medium">Color:</label>
                <select
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="border rounded-md p-2 w-full"
                >
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-2 mb-6">
              <Button onClick={decrementQuantity}>-</Button>
              <span className="px-4">{quantity}</span>
              <Button onClick={incrementQuantity}>+</Button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button
                variant={isInWishlist(product.id) ? "rose" : "outline"}
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
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
