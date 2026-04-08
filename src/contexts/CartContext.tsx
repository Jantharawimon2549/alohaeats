import React, { createContext, useContext, useState, useCallback } from "react";
import type { MenuItem, CartItem } from "@/data/menuData";
import { promotions } from "@/data/menuData";

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
  orderType: "dine-in" | "takeaway";
  setOrderType: (type: "dine-in" | "takeaway") => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const promo = promotions.find((p) => p.code.toLowerCase() === promoCode.toLowerCase());
  const discount = promo
    ? promo.type === "percent"
      ? Math.round(subtotal * (promo.discount / 100))
      : promo.discount
    : 0;
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, promoCode, setPromoCode, discount, orderType, setOrderType }}
    >
      {children}
    </CartContext.Provider>
  );
};
