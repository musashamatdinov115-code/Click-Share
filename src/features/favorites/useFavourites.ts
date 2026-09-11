import type { ProductsType } from "@/entities/products/model/type";
import { useState, useEffect } from "react";
const eventTarget = new EventTarget();

export function useFavorites() {
  const [favorites, setFavorites] = useState<ProductsType[]>(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleFavoritesChange = () => {
      const saved = localStorage.getItem("favorites");
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    eventTarget.addEventListener("favorites_updated", handleFavoritesChange);
    return () => {
      eventTarget.removeEventListener("favorites_updated", handleFavoritesChange);
    };
  }, []);

  const handleLikeProduct = (product: ProductsType) => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    const productId = product.id;
    
    const exists = existing.some((item: ProductsType) => item.id === productId);
    
    let updated;
    if (exists) {
      updated = existing.filter((item: ProductsType) => item.id !== productId);
    } else {
      updated = [...existing, product];
    }
    
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    
    eventTarget.dispatchEvent(new Event("favorites_updated"));
  };

  const isFavorite = (product: ProductsType) => {
    return favorites.some((item) => item.id === product.id);
  };

  return { favorites, handleLikeProduct, isFavorite };
}