import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import Category from "./Category";

const Categories = () => {
    const [truckCategories, setTruckCategories] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/truck-categories`).then(data => {
            // console.log(data);
            setTruckCategories(data.data);
        });
    }, []);
    // console.log(truckCategories);

    return (
        <section className="my-40">
            <SectionHeader>All Truck Categories</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 p-10">
                {truckCategories.map(truckCategory => (
                    <Category key={truckCategory._id} truckCategory={truckCategory}></Category>
                ))}
            </div>
        </section>
    );
};

export default Categories;
