import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Register from "../Pages/Register/Register";

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
                element: <AddAProduct></AddAProduct>,
            },
            {
                path: "/all-seller",
                element: <AllSeller></AllSeller>,
            },
            {
                path: "/all-user",
                element: <AllUser></AllUser>,
            },
            {
                path: "/my-orders",
                element: <MyOrders></MyOrders>,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;
