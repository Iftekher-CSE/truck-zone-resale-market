import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Spinner from "../Components/Spinner/Spinner";
import useAccountType from "../hooks/useAccountType";

const SellerRoute = ({ children }) => {
    const { user, loading, logout } = useContext(AuthContext);

    const [accountType, isAccountTypeLoading] = useAccountType(user?.email);

    console.log("loading: ", loading, "accountType:", accountType, "isAccountTypeLoading:", isAccountTypeLoading);

    const location = useLocation();

    if (loading || isAccountTypeLoading) {
        // console.log("inside loading");
        return <Spinner></Spinner>;
    }

    if (accountType === "seller-account") {
        // console.log("inside is admin");
        return children;
    }

    logout();

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
