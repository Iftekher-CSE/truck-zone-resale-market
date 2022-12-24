import React from "react";
import { useNavigate } from "react-router-dom";

const useLogOutNavigate = () => {
    const navigate = useNavigate();
    return navigate("/");
};

export default useLogOutNavigate;
