import React from "react";
import { GiWeight, GiTruck } from "react-icons/gi";
import { GrCalendar, GrCurrency, GrMap } from "react-icons/gr";
import PrimaryButton from "../../Components/Button/PrimaryButton";
const ProductCart = ({ truck }) => {
    const {
        brandName,
        model,
        catName,
        capacity,
        productImage,
        purchasePrice,
        askingPrice,
        milageKM,
        registrationYear,
        condition,
        location,
        postTime,
        advertised,
        reported,
    } = truck;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={productImage} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex justify-between">
                    <span>
                        {brandName} {model}
                    </span>
                    <div className="badge badge-warning">{askingPrice.toLocaleString()} Tk</div>
                </h2>
                <div className="card-actions justify-around">
                    <div className="flex w-full">
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GiWeight></GiWeight>
                            {capacity}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrCurrency></GrCurrency>
                            {purchasePrice}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrMap></GrMap>
                            {location}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrCalendar></GrCalendar>
                            {registrationYear}
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            {" "}
                            Posted on:
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                // second: "2-digit",
                            }).format(postTime)}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GiTruck></GiTruck>
                            {condition}
                        </div>
                    </div>
                </div>
                {/* seller name and verification badge */}
                <h3 className="text-2xl">
                    Seller Name
                    <span className="badge badge-md">NEW</span>
                </h3>
            </div>
            <div>
                <button className="btn btn-sm gap-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    Favorites
                </button>
                <button className="btn btn-sm gap-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Report
                </button>
                <PrimaryButton classes="px-8 py-3 font-semibold rounded-md">Book Now</PrimaryButton>
            </div>
        </div>
    );
};

export default ProductCart;
