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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
            {trucks.map(truck => (
                <ProductCart key={truck._id} truck={truck}></ProductCart>
            ))}
        </div>
    );
};

export default CategoryDetails;
