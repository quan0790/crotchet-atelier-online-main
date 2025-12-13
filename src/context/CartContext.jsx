import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('crochet-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [country, setCountry] = useState(() => {
    return localStorage.getItem('shippingCountry') || 'Kenya';
  });

  useEffect(() => {
    localStorage.setItem('crochet-cart', JSON.stringify(items));
    localStorage.setItem('shippingCountry', country);
  }, [items, country]);

  const addToCart = (
    product,
    quantity = 1,
    color,
    size,
    design,
    customSize
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

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateItemCustomization = (productId, field, value) => {
    setItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, [field]: value } : item))
    );
  };

  const clearCart = () => setItems([]);

  const getCartTotal = () => items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getCartCount = () => items.reduce((count, item) => count + item.quantity, 0);

  const isInCart = (productId) => items.some(item => item.product.id === productId);

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
