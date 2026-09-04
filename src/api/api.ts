import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CategoryType, ProductsType } from "./type"

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
       
    })
})

export const { useGetProductApiByNameQuery, useGetCategoryApiByNameQuery } = getApi