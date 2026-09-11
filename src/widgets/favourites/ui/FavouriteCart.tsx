import { useGetCategoryApiByNameQuery } from "@/api/api";
import StarRating from "@/features/starRating/RatingStar";
import { Button } from "@/shared/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import favoritesAnimate from "@/assets/favorites.json"
import { Link } from "react-router";
import { motion } from "framer-motion"
import { useFavorites } from "@/features/favorites/useFavourites";
import { Lottie } from "lottie-react";
import { useBasket } from "@/features/cart/useBasket";

export function FavouriteCart() {
  const { data: categories } = useGetCategoryApiByNameQuery();
  const { favorites, handleLikeProduct } = useFavorites();
  const { addToBasket, getProductQuantity } = useBasket();

  return (
    <div className="w-[95%] mx-auto max-w-[1400px] py-2 min-h-[calc(100vh-200px)]">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center justify-center">
            <Lottie src={favoritesAnimate} autoplay loop className="w-[200px] h-[200px]" />
            <p className="text-gray-700 mb-[10px]">Your favorite products are not available.</p>
            <Link to={"/products"} className="flex justify-center w-min items-center gap-1 px-[10px] py-[5px] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-sm text-[14px] font-medium">
              <span className="text-[18px]"><ArrowLeft size={15} /></span>
              <span>products</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {favorites.map((product) => {
            const currentcategory = categories?.find((cat) => cat.id === product.categoryId);
            const oldPrice = Math.round(product.price * 1.111);
            const quantity = getProductQuantity(product.id);

            return (
              <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 0, scale: 1 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }} whileInView={{ opacity: 1, y: 0 }} key={product.id} className="border-1 cursor-pointer gap-0 p-0 hover:border-indigo-100 h-full duration-100 flex flex-col rounded-md overflow-hidden shadow-sm bg-white relative text-gray-700">
                <button
                  onClick={() => handleLikeProduct(product)}
                  className="cursor-pointer absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center border border-red-400 bg-red-50/50"
                >
                  <Heart size={20} className="fill-red-500 text-red-500" />
                </button>

                <div>
                  <div className="absolute text-[12px] font-medium bg-black/40 shadow-sm backdrop-blur-[1px] text-white top-[10px] left-[10px] py-[2px] px-[5px] rounded-xs">
                    {currentcategory?.name || "Category"}
                  </div>
                  <div className="flex justify-center p-[10px] items-center border-b-[1px]">
                    <img className="h-[170px] sm:max-h-[200px] sm:min-h-[200px] object-contain" src={product.image} alt={product.name} />
                  </div>
                  <div className="px-[10px] py-[7px] flex flex-col gap-2 justify-between flex-1 bg-slate-50 hover:bg-indigo-50 duration-100 h-[132px]">
                    <h3 className="text-[14px] md:text-[16px] font-semibold">
                      {product.name}
                    </h3>
                    <div className="flex justify-start items-center text-[12px] font-medium gap-1">
                      <div>{product.rate}</div>
                      <div className="text-[14px] text-orange-500">
                        <div className="flex space-x-1">
                          <StarRating rating={product.rate} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col justify-between items-start">
                        <div className="text-[12px]">
                          <span className="line-through font-medium text-gray-500 mr-1">
                            ${oldPrice.toLocaleString()}
                          </span>
                          <span className="bg-indigo-200 inline-block px-[2px] rounded-xs">
                            -10%
                          </span>
                        </div>
                        <div className="text-[16px] font-bold text-indigo-600">
                          <span>${product.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="relative active:scale-98 duration-100">
                        <Button onClick={(e) => {
                          e.stopPropagation(), addToBasket(product);
                        }} className="relative cursor-pointer w-[38px] h-[38px] flex justify-center items-center rounded-lg text-[20px] shadow-sm bg-gradient-to-r from-blue-600 to-indigo-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white active:shadow-none active:bg-gradient-to-r active:from-blue-600 active:to-indigo-700">
                          {quantity > 0 && (
                            <span className="text-[12px] absolute top-[-10px] pt-[2px] right-[-10px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-indigo-600 rounded-full text-white">{quantity}</span>

                          )}
                          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-plus-icon lucide-shopping-cart-plus "><path d="M16 5h6" /><path d="M19 2v6" /><path d="m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18" /><path d="M4.564 5H12" /><path d="M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  );
}