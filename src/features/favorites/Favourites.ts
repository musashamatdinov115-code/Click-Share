import { useLazyGetProductsIdApiByNameQuery } from "@/api/api";
import { toast } from "react-toastify";

export function useFavorites() {
  const [triggerGetProduct] = useLazyGetProductsIdApiByNameQuery();

  const handleLikeProduct = async (productId: string | number) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyLiked = existingFavorites.some((item: any) => item.id === productId);

    if (isAlreadyLiked) {
      const updatedFavorites = existingFavorites.filter((item: any) => item.id !== productId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast.info("Removed from favorites", { autoClose: 2000 });
    } else {
      try {
        const result = await triggerGetProduct(productId as any).unwrap();
        existingFavorites.push(result);
        localStorage.setItem("favorites", JSON.stringify(existingFavorites));
        toast.success("Added to favorites!", { autoClose: 2000 });
      } catch (error) {
        console.error("Failed to fetch product", error);
        toast.error("Failed to add product", { autoClose: 2000 });
      }
    }
  };

  return { handleLikeProduct };
}