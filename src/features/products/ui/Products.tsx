import { useGetCategoryApiByNameQuery, useGetProductApiByNameQuery } from "@/api/api"
import StarRating from "@/features/starRating/RatingStar";
import { Button } from "@/shared/ui/button";
import { Heart } from "lucide-react";
import { Card } from "@/shared/ui/card";
interface ProductsProps {
    selectedCategory: string | null;
}

function Products({ selectedCategory }: ProductsProps) {
    const { data: products } = useGetProductApiByNameQuery()
    const { data: categories } = useGetCategoryApiByNameQuery()

    const filteredProducts = selectedCategory ? products?.filter((item) => item.categoryId.toString() === selectedCategory) : products;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2  w-[95%] mx-auto max-w-[1400px]">
            {filteredProducts?.map((item) => {
                const currentcategory = categories?.find((cat) => cat.id === item.categoryId)
                const oldPrice = Math.round(item.price * 1.111);

                return (
                    <Card key={item.id} className="cursor-pointer gap-0 p-0 hover:border-indigo-100 h-full duration-100 flex flex-col rounded-md overflow-hidden shadow-sm bg-white relative text-gray-700">
                        <Button size={"icon-lg"} className={"rounded-full cursor-pointer bg-black/20 duration-150 text-white hover:scale-105 border-[1px] border-gray-200  hover:bg-opacity-15 absolute top-[7px] right-[7px] active:scale-100"}>
                            <Heart />
                        </Button>
                        <div className="absolute text-[12px] font-medium bg-black/40 shadow-sm  backdrop-blur-[1px] text-white top-[10px] left-[10px] py-[2px] px-[5px] rounded-xs">
                            {currentcategory?.name || "Category"}
                        </div>
                        <div className="flex justify-center p-[10px] items-center border-b-[1px] ">
                            <img className="h-[170px] sm:max-h-[200px] sm:min-h-[200px] object-contain" src={item.image} alt={item.name} />
                        </div>
                        <div className="px-[10px] py-[7px] flex flex-col gap-2 justify-between flex-1 bg-slate-50 hover:bg-indigo-50 duration-100">
                            <h3 className="text-[14px] md:text-[16px] font-semibold">
                                {item.name}
                            </h3>
                            <div className="flex justify-start items-center text-[12px] font-medium gap-1">
                                <div>
                                    {item.rate}
                                </div>
                                <div className="text-[14px] text-orange-500">
                                    <div className="flex space-x-1">
                                        <StarRating rating={item.rate} />
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
                                        <span>
                                            ${item.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative active:scale-98 duration-100">
                                    <Button className="cursor-pointer w-[38px] h-[38px] flex justify-center items-center rounded-lg text-[20px] shadow-sm bg-gradient-to-r from-blue-600 to-indigo-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white active:shadow-none active:bg-gradient-to-r active:from-blue-600 active:to-indigo-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-plus-icon lucide-shopping-cart-plus "><path d="M16 5h6" /><path d="M19 2v6" /><path d="m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18" /><path d="M4.564 5H12" /><path d="M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default Products