import type { ProductsType } from "@/entities/products/model/type";

export function useFavorites() {
  const handleLikeProduct = (product: ProductsType) => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    const productId = product.id
    
    const exists = existing.some((item: ProductsType) => (item.id) === productId);
    
    let updated;
    if (exists) {
      updated = existing.filter((item: ProductsType) => (item.id) !== productId);
    } else {
      updated = [...existing, product];
    }
    
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return { handleLikeProduct };
}