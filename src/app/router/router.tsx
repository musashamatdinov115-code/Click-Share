import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home/HomePage";
import ProductsPage from "@/pages/products/ProductsPage";
import FavouritePage from "@/pages/favorites/FavouritePage";
import BasketPage from "@/pages/cart/BasketPage";
import MainLayout from "../layouts/MainLayout";
import ProfilePage from "@/pages/profile/ProfilePage";
import OneProductPage from "@/pages/productDetailPage/OneProductPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path : "/products",
                element: <ProductsPage/>
            },
            {
                path : "/favourite",
                element: <FavouritePage/>
            },
            {
                path : "/basket",
                element: <BasketPage/>
            },
            {
                path : "/profile",
                element: <ProfilePage/>
            },
            {
                path : "/products/:id",
                element: <OneProductPage/>
            },
        ]
    }
])