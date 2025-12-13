import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { Instagram, Mail, Phone, Truck, Shield, RefreshCw } from "lucide-react";

export default function Checkout() {
  const { items, getCartTotal, country, getShippingCost } = useCart();
  const { formatPrice } = useCurrency();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const subtotal = getCartTotal();
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const createWhatsAppLink = () => {
    let message = `Hello! I want to place an order:\n\n`;
    items.forEach((item) => {
      message += `${item.product.name} x ${item.quantity}`;
      if (item.selectedColor) message += `, Color: ${item.selectedColor}`;
      if (item.selectedSize) message += `, Size: ${item.selectedSize}`;
      if (item.selectedDesign) message += `, Design: ${item.selectedDesign}`;
      if (item.customSize) message += `, Custom Size: ${item.customSize}`;
      message += `\n`;
    });
    message += `\nSubtotal: ${formatPrice(subtotal)}`;
    message += `\nShipping: Fast & Secure Delivery`;
    message += `\nTotal: ${formatPrice(total)}`;
    if (name) message += `\nName: ${name}`;
    if (city) message += `\nCity: ${city}`;
    return `https://wa.me/254790264792?text=${encodeURIComponent(message)}`;
  };

  const instagramDM = `https://www.instagram.com/direct/inbox/?username=crochets_atelier`;
  const tiktokLink = `https://www.tiktok.com/@becky_kay14?_r=1&_t=ZM-91xIhcAIg5T`;
  const emailLink = "mailto:crochetsatelier@example.com?subject=Order%20Inquiry";
  const callLink = "tel:+254708353369";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="font-serif text-3xl font-bold text-center mb-8">Checkout</h1>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Contact Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-card"
            />
            <input
              type="text"
              placeholder="City / Town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-card"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-card p-6 rounded-2xl shadow-soft space-y-4">
            <h2 className="font-semibold text-xl">Order Summary</h2>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Fast & Secure Delivery</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <p className="text-center text-sm md:text-base text-muted-foreground mt-2 mb-4 animate-bounce">
            Contact the seller to discuss your order, delivery, customization, and payment options 👇
          </p>

          {/* Social / Contact Buttons */}
          <div className="flex gap-4 justify-center mt-2">
            <a href={createWhatsAppLink()} target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <Button variant="ghost" size="lg" className="hover:scale-110 transition-transform duration-300">
                <FaWhatsapp className="h-6 w-6 text-green-500" />
              </Button>
            </a>

            <a href={instagramDM} target="_blank" rel="noopener noreferrer" title="Instagram DM">
              <Button variant="ghost" size="lg" className="hover:scale-110 transition-transform duration-300">
                <Instagram className="h-6 w-6 text-pink-500" />
              </Button>
            </a>

            <a href={tiktokLink} target="_blank" rel="noopener noreferrer" title="TikTok">
              <Button variant="ghost" size="lg" className="hover:scale-110 transition-transform duration-300">
                <FaTiktok className="h-6 w-6 text-black" />
              </Button>
            </a>

            <a href={emailLink} target="_blank" rel="noopener noreferrer" title="Email">
              <Button variant="ghost" size="lg" className="hover:scale-110 transition-transform duration-300">
                <Mail className="h-6 w-6 text-blue-500" />
              </Button>
            </a>

            <a href={callLink} title="Call">
              <Button variant="ghost" size="lg" className="hover:scale-110 transition-transform duration-300">
                <Phone className="h-6 w-6 text-gray-700" />
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-2xl mt-6">
            {[
              { icon: Truck, label: 'Fast & Secure Delivery', sub: 'Nationwide & Worldwide' },
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
    </Layout>
  );
}
