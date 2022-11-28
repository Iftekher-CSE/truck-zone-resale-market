import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../Components/Spinner/Spinner";

const AdminRoute = ({ children }) => {
    const { user, loading, logout } = useContext(AuthContext);

    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    console.log("loading: ", loading, "isAdminLoading:", isAdminLoading, "isAdmin:", isAdmin);

    const location = useLocation();

    if (loading || isAdminLoading) {
        // console.log("inside loading");
        return <Spinner></Spinner>;
    }

    if (isAdmin && user) {
        // console.log("inside is admin");
        return children;
    }

    logout();

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
