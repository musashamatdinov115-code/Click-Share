import type { ProductsType } from "@/entities/products/model/type";
import { useState, useEffect } from "react";

const eventTarget = new EventTarget();

export interface BasketItem extends ProductsType {
  quantity: number;
}

export function useBasket() {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem("basket");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleBasketChange = () => {
      const saved = localStorage.getItem("basket");
      setBasket(saved ? JSON.parse(saved) : []);
    };

    eventTarget.addEventListener("basket_updated", handleBasketChange);
    return () => {
      eventTarget.removeEventListener("basket_updated", handleBasketChange);
    };
  }, []);
  const removeFromBasket = (productId: number) => {
    const existing: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    const updated = existing.filter((item) => item.id !== productId);

    localStorage.setItem("basket", JSON.stringify(updated));
    setBasket(updated);
    eventTarget.dispatchEvent(new Event("basket_updated"));
  };

  const addToBasket = (product: ProductsType) => {
    const existing: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    const existsIndex = existing.findIndex((item) => item.id === product.id);

    let updated;
    if (existsIndex > -1) {
      updated = existing.map((item, index) => 
        index === existsIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...existing, { ...product, quantity: 1 }];
    }

    localStorage.setItem("basket", JSON.stringify(updated));
    setBasket(updated);
    eventTarget.dispatchEvent(new Event("basket_updated"));
  };
  const updateQuantity = (productId: number, newQuantity: number) => {
    const existing: BasketItem[] = JSON.parse(localStorage.getItem("basket") || "[]");
    
    let updated;
    if (newQuantity <= 0) {
      updated = existing.filter((item) => item.id !== productId);
    } else {
      updated = existing.map((item) => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    }

    localStorage.setItem("basket", JSON.stringify(updated));
    setBasket(updated);
    eventTarget.dispatchEvent(new Event("basket_updated"));
  };

  const getProductQuantity = (productId: number) => {
    const item = basket.find((p) => p.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { basket, addToBasket,removeFromBasket,updateQuantity, getProductQuantity, totalCount, totalPrice };
}