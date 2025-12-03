import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, Star, ChevronLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/context/CurrencyContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency, conversionRate } = useCurrency();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isInWishlist(product.id) ? "removed from" : "added to"} your wishlist.`,
    });
  };

  // Format prices dynamically
  const formattedPrice = new Intl.NumberFormat(
    currency === "KES" ? "en-KE" : "en-US",
    { style: "currency", currency, minimumFractionDigits: 0 }
  ).format(product.price * conversionRate);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat(currency === "KES" ? "en-KE" : "en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
      }).format(product.originalPrice * conversionRate)
    : null;

  const isOnSale = !!product.originalPrice && product.originalPrice > product.price;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">{formattedPrice}</span>
                {isOnSale && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formattedOriginalPrice}
                    </span>
                    <span className="px-3 py-1 bg-rose text-rose-foreground text-sm font-medium rounded-full">
                      Save {currency === "KES"
                        ? Math.round((product.originalPrice - product.price) * conversionRate)
                        : `$${(product.originalPrice - product.price).toFixed(2)}`
                      }
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 text-sm transition-all",
                        selectedColor === color
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-3">Size: <span className="text-muted-foreground">{selectedSize}</span></p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 w-12 rounded-lg border-2 text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            <div className="mb-8">
              <p className="font-medium mb-2">Materials</p>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <span key={material} className="px-3 py-1 bg-secondary text-sm rounded-full">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant={isInWishlist(product.id) ? "rose" : "outline"}
                size="lg"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-2xl">
              {[
                { icon: Truck, label: ' Fast & Secure   Delivery ', sub: 'Nationwide' },
                { icon: Shield, label: 'Secure Payment', sub: '100% Protected' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '30 Day Policy' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
