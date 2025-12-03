import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency, conversionRate } = useCurrency();

  // Use the currency context for formatting prices consistently
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${
        isInWishlist(product.id) ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                New
              </span>
            )}
            {isOnSale && (
              <span className="px-3 py-1 text-xs font-medium bg-rose text-rose-foreground rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
              isInWishlist(product.id)
                ? "bg-rose text-rose-foreground"
                : "bg-background/80 backdrop-blur text-muted-foreground hover:bg-background hover:text-rose"
            )}
          >
            <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
          </button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              variant={isInCart(product.id) ? "secondary" : "default"}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {isInCart(product.id) ? "In Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-medium text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{formattedPrice}</span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
