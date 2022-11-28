import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AllSeller from "../Pages/AllSelller/AllSeller";
import AllUser from "../Pages/AllUser/AllUser";
import Blog from "../Pages/Blogs/Blog";
import CategoryDetails from "../Pages/CategoryDetails/CategoryDetails";
import AddAProduct from "../Pages/Dashboard/AddAProduct/AddAProduct";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyOrders from "../Pages/MyOrders/MyOrders";
import MyProducts from "../Pages/MyProducts/MyProducts";
import Payment from "../Pages/Payment/Payment";
import Register from "../Pages/Register/Register";
import ReportedProducts from "../Pages/ReportedProducts/ReportedProducts";
import AdminRoute from "./AdminRout";
import BuyerRoute from "./BuyerRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/home",
                element: <Home></Home>,
            },
            {
                path: "/trucks/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/trucks/${params.id}`),
                element: <CategoryDetails></CategoryDetails>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/blog",
                element: <Blog></Blog>,
            },
            {
                path: "/add-a-product",
                element: (
                    <SellerRoute>
                        <AddAProduct></AddAProduct>
                    </SellerRoute>
                ),
            },
            {
                path: "/all-seller",
                element: (
                    <AdminRoute>
                        <AllSeller></AllSeller>
                    </AdminRoute>
                ),
            },
            {
                path: "/all-user",
                element: (
                    <AdminRoute>
                        <AllUser></AllUser>
                    </AdminRoute>
                ),
            },
            {
                path: "/my-orders",
                element: (
                    <BuyerRoute>
                        <MyOrders></MyOrders>
                    </BuyerRoute>
                ),
            },
            {
                path: "/my-products",
                element: (
                    <SellerRoute>
                        <MyProducts></MyProducts>
                    </SellerRoute>
                ),
            },
            {
                path: "/reported-products",
                element: (
                    <AdminRoute>
                        <ReportedProducts></ReportedProducts>
                    </AdminRoute>
                ),
            },
            {
                path: "/payment/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_API_URL}/bookings/${params.id}`),
                element: (
                    <BuyerRoute>
                        <Payment></Payment>
                    </BuyerRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;
