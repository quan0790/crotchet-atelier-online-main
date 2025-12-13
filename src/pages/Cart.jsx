import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart, country, setCountry, getShippingCost } = useCart();
  const { formatPrice } = useCurrency();

  const subtotal = getCartTotal();
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 p-4 bg-card rounded-2xl shadow-soft">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border">
                  <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    {item.selectedColor && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <span>Color: {item.selectedColor}</span>
                      </p>
                    )}

                  <p className="font-semibold text-lg">{formatPrice(item.product.price)}</p>
                </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-soft p-6 sticky top-24 space-y-4">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card mb-4"
                >
                  <option value="Kenya">Kenya</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span> Fast & Secure   Delivery </span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full mt-4" size="lg">
                  Contact Seller / Place Order
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-2xl mt-4">
                {[
                  { icon: Truck, label: ' Fast & Secure   Delivery ', sub: 'Nationwide & Worldwide' },
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
        </div>
      </div>
    </Layout>
  );
}
