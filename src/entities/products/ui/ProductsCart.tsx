import CustomLoader from "@/features/customLoader/CustomLoader";
import Products from "@/features/products/ui/Products";
import { useEffect, useState } from "react";
import {  motion } from "framer-motion"
import Categories from "@/entities/categories/ui/Categories";
import type { ProductsType } from "../model/type";

function ProductsCart() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-[70vh] w-full items-center justify-center">
          <CustomLoader />
        </div>
      ) : (
        <>
          <div className="sticky right-[10px] bg-white z-[5] left-[10px] top-[-2px] p-[7px] border-b-[1px] shadow-sm ">
            <motion.div initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration : 0.9,  delay : 0.2, ease : "easeOut", stiffness : 70, damping : 10, mass : 1 }} className="flex justify-start items-center gap-1 max-w-[1400px] mx-auto ">
              <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration : 0.9,  delay : 0.2, ease : "easeOut", stiffness: 100, damping: 13, mass :1 }} className="py-[8px]">
            <Products selectedCategory={selectedCategory} />
          </motion.div>
        </>
      )}
    </div>
  )
}

export default ProductsCart