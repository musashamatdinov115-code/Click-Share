import { Link, useParams } from "react-router";
import { useGetCategoryApiByNameQuery, useGetProductsIdApiByNameQuery } from "@/api/api";
import InnerImageZoom from 'react-inner-image-zoom'
import { Button } from "@/shared/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "@/features/favorites/useFavourites";
import { useState } from "react";
import StarRating from "@/features/starRating/RatingStar";
import { useBasket } from "@/features/cart/useBasket";
export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { addToBasket, getProductQuantity } = useBasket();

    const { data: product } = useGetProductsIdApiByNameQuery(id || "");
    const { handleLikeProduct } = useFavorites();
    const [favoritesMap, setFavoritesMap] = useState<Record<string | number, boolean>>({});

    const { data: categories } = useGetCategoryApiByNameQuery()
    const currentcategory = categories?.find((cat) => cat.id === product?.categoryId)
    const onLikeClick = async (product: any) => {
        await handleLikeProduct(product);
        setFavoritesMap((prev) => ({
            ...prev,
            [product.id]: !prev[product.id],
        }));
    };

    const quantity = getProductQuantity(product ? product.id : 0)


    if (!product) return <div>Product not found</div>;

    return (
        <div className="p-[10px] text-gray-800 w-full lg:w-[95%] mx-auto max-w-[1400px]">
            <div className="flex flex-col md:flex-row gap-[10px]">
                <div className="flex-1 relative ">
                    <div className="w-full h-full  border-[1px] rounded-sm p-[5px] shadow-sm overflow-hidden">
                        <figure>
                            <div>
                                <InnerImageZoom className="custom-iiz-container  object-contain" hideHint={false} src={product.image} zoomSrc={product.image} zoomType="hover" zoomScale={1} width={430} height={430} />
                            </div>
                        </figure>
                    </div>
                    <div className="px-[10px] py-[5px] absolute top-[10px] left-[10px] font-semibold text-[12px] bg-indigo-800/55 rounded-none text-white backdrop-blur-[2px] flex justify-center items-center">
                        {currentcategory?.name}
                    </div>
                </div>
                <div className="flex-[1.5] p-[10px] flex flex-col gap-[10px] justify-between">
                    <div className="hidden md:block">
                        <div className="flex justify-between items-center gap-[10px]">
                            <Link to={"/products"}>
                                <Button className={"px-[10px] py-[15px] cursor-pointer font-medium text-[15px] bg-slate-100 rounded-none text-slate-700 active:scale-95 hover:bg-slate-200 flex justify-center items-center gap-1"}>
                                    <div>
                                        <ArrowLeft size={16} />
                                    </div>
                                    <div>
                                        Back
                                    </div>
                                </Button>
                            </Link>
                            <Button onClick={() => onLikeClick(product)} size={"icon-lg"} className={`rounded-none cursor-pointer bg-white/20 duration-150 border-red-500 text-white hover:bg-red-500/15 `}>
                                <Heart className={`text-red-500 ${favoritesMap[product.id] ? "fill-red-500" : "text-red-500"} `} />
                            </Button>
                        </div>
                        <hr className="my-[7px]" />
                    </div>
                    <div className="flex flex-col gap-[10px] flex-1 justify-center">
                        <h3 className="text-[20px] font-semibold" >
                            {product.name}
                        </h3>
                        <div>
                            <h5 className="font-semibold text-[14px]">
                                Description:
                            </h5>
                            <p className="text-[12px] lg:text-[14px] font-medium leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-1">
                            <div className="flex gap-1 items-center">
                                <span className="font-medium">price:</span>
                                <span className="font-semibold text-[18px] text-indigo-700">$ {product.price.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="font-medium text-lg">{product.rate}</span>
                                <span className="text-lg text-orange-500 ">{<StarRating rating={product.rate} />}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="my-[7px]" />
                    <div className="flex justify-between items-center gap-1">
                        <Link to={"/products"} className="block md:hidden">
                            <Button className={"px-[10px] py-[5px] font-medium text-[14px] bg-slate-100 rounded-none text-slate-700 active:scale-95 hover:bg-slate-200 flex justify-center items-center gap-1"}>
                                <div>
                                    <ArrowLeft size={16} />
                                </div>
                                <div>
                                    Back
                                </div>
                            </Button>
                        </Link>
                        <div className="flex justify-end gap-[10px] flex-1">
                            <Button onClick={() => onLikeClick(product)} size={"icon-lg"} className={`w-[35px] h-[35px] flex md:hidden justify-center items-center border-[1px] border-red-400 active:scale-95 text-red-500 font-medium rounded-none`}>
                                <Heart className={`text-red-500 ${favoritesMap[product.id] ? "fill-red-500" : "text-red-500"} `} />
                            </Button>
                            <Button onClick={(e) => { e.stopPropagation(), addToBasket(product) }} className={"duration-100 px-[15px] relative py-4.5 flex justify-center items-center gap-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium rounded-none"}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-plus-icon lucide-shopping-cart-plus "><path d="M16 5h6" /><path d="M19 2v6" /><path d="m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18" /><path d="M4.564 5H12" /><path d="M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                                </span>
                                <span className="text-lg">
                                    Add to cart
                                </span>
                                {quantity > 0 && (
                                    <span className="text-[12px] absolute top-[-5px] pt-[1px] right-[-7px] font-semibold flex justify-center items-center w-[20px] h-[20px] bg-orange-500 rounded-full text-white">
                                        {quantity}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}