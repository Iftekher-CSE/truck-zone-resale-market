import React from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Category from "./Category";

const Categories = () => {
    return (
        <section>
            <SectionHeader>All Truck Categories</SectionHeader>
            <div className="flex flex-row gap-16 p-10 new_title">
                <Category></Category>
                <Category></Category>
                <Category></Category>
            </div>
        </section>
    );
};

export default Categories;
