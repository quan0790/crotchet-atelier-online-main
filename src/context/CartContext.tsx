import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedDesign?: string;
  customSize?: string;
}

interface CartContextType {
  items: CartItem[];
  country: string;
  setCountry: (country: string) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    color?: string,
    size?: string,
    design?: string,
    customSize?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getShippingCost: () => number;
  getTotalWithShipping: () => number;
  isInCart: (productId: string) => boolean;
  updateItemCustomization: (
    productId: string,
    field: keyof CartItem,
    value: string
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crochet-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [country, setCountry] = useState<string>(() => {
    return localStorage.getItem('shippingCountry') || 'Kenya';
  });

  useEffect(() => {
    localStorage.setItem('crochet-cart', JSON.stringify(items));
    localStorage.setItem('shippingCountry', country);
  }, [items, country]);

  const addToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    design?: string,
    customSize?: string
  ) => {
    setItems(prev => {
      const existing = prev.find(
        item =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size &&
          item.selectedDesign === design &&
          item.customSize === customSize
      );

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size &&
          item.selectedDesign === design &&
          item.customSize === customSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        { product, quantity, selectedColor: color, selectedSize: size, selectedDesign: design, customSize },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateItemCustomization = (productId: string, field: keyof CartItem, value: string) => {
    setItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, [field]: value } : item))
    );
  };

  const clearCart = () => setItems([]);

  const getCartTotal = () => items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getCartCount = () => items.reduce((count, item) => count + item.quantity, 0);

  const isInCart = (productId: string) => items.some(item => item.product.id === productId);

  const getShippingCost = () => {
    const subtotal = getCartTotal();
    if (country === 'Kenya') return subtotal >= 350 ? 0 : 300;
    return subtotal >= 75 ? 0 : 9.99;
  };

  const getTotalWithShipping = () => getCartTotal() + getShippingCost();

  return (
    <CartContext.Provider
      value={{
        items,
        country,
        setCountry,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getShippingCost,
        getTotalWithShipping,
        isInCart,
        updateItemCustomization,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
