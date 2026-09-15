import { Button } from "@/shared/ui/button";
import { ArrowLeft, Plus, Minus, X } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useBasket } from "@/features/cart/useBasket";
import animateBasket from "@/assets/Basket.json"
import { Lottie } from "lottie-react";

export default function BasketCart() {
  const { basket, removeFromBasket, updateQuantity, totalPrice, totalCount } = useBasket();

  const originalTotalPrice = Math.round(totalPrice * 1.111);

  return (
    <div className="w-[95%] mx-auto max-w-[1400px] py-4 min-h-[calc(100vh-200px)]">
      {basket.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <Lottie src={animateBasket} autoplay loop className="w-[200px] h-[200px]" />
          <p className="text-gray-700 mb-[10px] font-medium">Your basket products are not available.</p>
          <Link to={"/products"} className="flex justify-center w-min items-center gap-1 px-[10px] py-[5px] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-sm text-[14px] font-medium text-gray-700">
            <ArrowLeft size={15} />
            <span>products</span>
          </Link>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 items-start">

          <div className="flex flex-col gap-3">
            {basket.map((product: any) => {
              const itemTotalPrice = product.price

              return (
                <div

                  className="flex flex-col sm:flex-row items-center  border border-gray-200 bg-white p-4 rounded-sm shadow-sm relative gap-4">
                  <button
                    onClick={() => removeFromBasket(product.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <X size={18} />
                  </button>

                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1 pr-6">
                    <img className="w-[70px] h-[70px] object-contain" src={product.image} alt={product.name} />
                    <div>
                      <Link to={`/products/${product.id}`} className="font-semibold text-[15px] text-gray-800 cursor-pointer hover:text-blue-600">{product.name}</Link>
                      <p className="text-[13px] text-gray-500">price: $ {product.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3  w-full sm:w-auto my-2 sm:my-0  justify-center shrink-0 mr-[160px]">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 cursor-pointer transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-semibold text-[14px] text-gray-800">{product.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 cursor-pointer transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right  shrink-0 w-[100px]">
                    <span className="text-[12px] text-gray-400 block sm:hidden">Total price</span>
                    <span className="font-bold text-[16px] text-gray-800">$ {itemTotalPrice.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-gray-200 bg-white p-5 rounded-sm shadow-sm flex flex-col gap-4 sticky top-4">
            <h2 className="font-bold text-[18px] text-gray-800 border-b pb-3">Order Summary</h2>

            <div className="flex justify-between text-[14px] text-gray-600">
              <span>Products:</span>
              <span className="font-semibold text-gray-800">{totalCount}</span>
            </div>

            <div className="flex justify-between text-[14px] text-gray-600 items-center">
              <span>The discount:</span>
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400">$ {originalTotalPrice.toLocaleString()}</span>
                <span className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-1.5 py-0.5 rounded">-10%</span>
              </div>
            </div>

            <div className="flex justify-between text-[15px] font-bold text-gray-800 border-t pt-3">
              <span>All total price:</span>
              <span className="text-indigo-600 text-[18px]">$ {totalPrice.toLocaleString()}</span>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-md shadow-md cursor-pointer transition-all">
              CHECKOUT
            </Button>
          </div>

        </motion.div>
      )}
    </div>
  );
}