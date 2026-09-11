import { useParams } from "react-router";
import { useGetCategoryApiByNameQuery, useGetProductsIdApiByNameQuery } from "@/api/api";
import InnerImageZoom from 'react-inner-image-zoom'
export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { data: product } = useGetProductsIdApiByNameQuery(id || "");

    const { data: categories } = useGetCategoryApiByNameQuery()
    const currentcategory = categories?.find((cat) => cat.id === product?.categoryId)


    if (!product) return <div>Product not found</div>;

    return (
        <div className="p-[10px] text-gray-800 w-full lg:w-[95%] mx-auto max-w-[1400px]">
            <div className="flex flex-col md:flex-row gap-[10px]">
                <div className="flex-1 relative ">
                    <div className="w-full h-full  border-[1px] rounded-sm p-[5px] shadow-sm overflow-hidden">
                        <figure>
                            <div>
                                <InnerImageZoom className="custom-iiz-container  object-contain" hideHint={false} src={product.image} zoomSrc={product.image} zoomType="hover" zoomScale={1} width={430} height={430}/>
                            </div>
                        </figure>
                    </div>
                    <div className="px-[10px] py-[5px] absolute top-[10px] left-[10px] font-semibold text-[12px] bg-indigo-800/55 rounded-sm text-white backdrop-blur-[2px] flex justify-center items-center">
                        {currentcategory?.name}
                    </div>
                </div>
                <div className="flex-[1.5] p-[10px] flex flex-col gap-[10px] justify-between">

                </div>
            </div>
        </div>
    );
}