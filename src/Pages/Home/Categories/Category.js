import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../Components/Button/PrimaryButton";

const Category = ({ truckCategory }) => {
    const { _id, catName, catDescription, catImage } = truckCategory;
    return (
        <div className="card card-compact shadow-2xl">
            <figure>
                <img className="p-4" src={catImage} alt="truck" />
            </figure>
            <div className="card-body text-center">
                <h2 className="card-title justify-center text-2xl font-bold">{catName}</h2>
                <p>{catDescription}</p>
                <Link to={`/truck-category/${catName}`}>
                    <PrimaryButton classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-[#23292E] hover:text-white text-gray-100">
                        Show all {catName}
                    </PrimaryButton>
                </Link>
            </div>
        </div>
    );
};

export default Category;
