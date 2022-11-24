import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import ProductCart from "./ProductCart";

const CategoryDetails = () => {
    const trucks = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Spinner></Spinner>;
    }

    return (
        <div>
            {trucks.map(truck => (
                <ProductCart key={truck._id} truck={truck}></ProductCart>
            ))}
        </div>
    );
};

export default CategoryDetails;
