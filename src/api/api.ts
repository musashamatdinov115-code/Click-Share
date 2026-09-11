import type { CategoryType } from "@/entities/categories/model/type"
import type { ProductsType } from "@/entities/products/model/type"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const getApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://yayraserver-production.up.railway.app/api",}),

    endpoints: (build) => ({
        getProductApiByName: build.query<ProductsType[], void>({
            query: () => "/products/get"
        }),
        getCategoryApiByName: build.query<CategoryType[], void>({
            query: () => "/categories/get"
        }),
        getCategoryIdApiByName: build.query<CategoryType[], void>({
            query: (id) => `/categories/get-one/${id}`
        }),
        getProductsIdApiByName: build.query<ProductsType, string>({
            query:(id) => `/products/get-one/${id}`
        }),
       
    })
})

export const { useGetProductApiByNameQuery, useGetCategoryApiByNameQuery, useLazyGetProductsIdApiByNameQuery, useGetProductsIdApiByNameQuery } = getApi