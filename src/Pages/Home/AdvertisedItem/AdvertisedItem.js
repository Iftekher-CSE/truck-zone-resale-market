import React from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import ProductCart from "../../CategoryDetails/ProductCart";

const AdvertisedItem = ({ advProducts, refetch }) => {
    return (
        <div className="my-20">
            <SectionHeader>Advertised Item</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                {advProducts.map(advProduct => (
                    <ProductCart key={advProduct._id} truck={advProduct} prodRefetch={refetch}></ProductCart>
                ))}
            </div>
        </div>
    );
};

export default AdvertisedItem;
