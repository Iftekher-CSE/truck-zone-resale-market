import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { GiWeight, GiTruck, GiRoad } from "react-icons/gi";
import { GrCalendar, GrCurrency, GrMap } from "react-icons/gr";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import { FcApproval } from "react-icons/fc";
import { AuthContext } from "../../contexts/AuthProvider";
import BookingModal from "../../Components/BookingModal/BookingModal";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const ProductCart = ({ truck, prodRefetch }) => {
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
        location: meetingLocation,
        postTime,
        sellerEmail,
        advertised,
        reported,
    } = truck;

    const [bookingProduct, setBookingProduct] = useState("");
    const { user } = useContext(AuthContext);

    // console.log(sellerEmail);

    // get user data form db
    const { data: seller = [] } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${truck?.sellerEmail}`);
            const data = await res.json();
            // console.log(data);
            return data;
        },
    });

    // report and !report a product
    const handelReportProduct = product => {
        fetch(`${process.env.REACT_APP_API_URL}/allTrucks/reported/${truck._id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("Product Reported state Changed");
                    prodRefetch();
                    // window.location.reload(true);
                }
            });
    };

    return (
        <div className="card bg-base-100 shadow-xl rounded-xl">
            <figure>
                <img className="h-56" src={productImage} alt="Shoes" />
            </figure>
            <div className="card-body p-4">
                {/* name and price */}
                <h2 className="card-title flex justify-between">
                    <span className="font-bold">
                        {brandName} - {model}
                    </span>
                    <div className="badge badge-warning text-lg font-bold">
                        {parseInt(askingPrice).toLocaleString()} Tk
                    </div>
                </h2>

                {/* product description with icon */}
                <div className="card-actions justify-around">
                    <div className="flex w-full">
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GiWeight></GiWeight>
                            {capacity}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrCurrency></GrCurrency>
                            {parseInt(purchasePrice).toLocaleString()}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrMap></GrMap>
                            {meetingLocation}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GrCalendar></GrCalendar>
                            {registrationYear}
                        </div>
                        <div className="divider divider-horizontal m-0"></div>
                        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                            <GiRoad></GiRoad>
                            {milageKM}
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
                    {seller.displayName}
                    <span className="badge badge-ghost bg-white border-0">
                        {seller?.sellerVerified && <FcApproval className="w-8 h-8"></FcApproval>}
                    </span>
                </h3>
            </div>
            <div className="flex justify-around items-center bg-gray-200 py-2  rounded-b-md">
                {/* add to favorite */}
                <button className="btn btn-sm gap-2 " title="Add to Favorite">
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
                </button>
                {/* rport to admin */}
                <button
                    onClick={() => handelReportProduct(truck)}
                    className={`btn btn-sm gap-2 ${reported ? "btn-error" : "btn-outline"}`}
                    title="Report to admin"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* check user before opening modal */}
                {user?.uid ? (
                    <label
                        onClick={() => setBookingProduct(truck)}
                        htmlFor="product-booking-modal"
                        className="btn bg-[#FBE122] text-[#23292E] hover:bg-[#23292E] hover:text-[#FBE122] px-8 py-3 font-semibold rounded-xl"
                    >
                        Book Now
                    </label>
                ) : (
                    <Link to="/login">
                        <label className="btn bg-[#FBE122] text-[#23292E] hover:bg-[#23292E] hover:text-[#FBE122] px-8 py-3 font-semibold rounded-xl">
                            Book Now
                        </label>
                    </Link>
                )}

                {/* <label
                    onClick={() => setBookingProduct(truck)}
                    htmlFor="product-booking-modal"
                    className="btn bg-[#FBE122] text-[#23292E] hover:bg-[#23292E] hover:text-[#FBE122] px-8 py-3 font-semibold rounded-xl"
                >
                    Book Now
                </label> */}
            </div>
            {bookingProduct && (
                <BookingModal bookingProduct={bookingProduct} setBookingProduct={setBookingProduct}></BookingModal>
            )}
        </div>
    );
};

export default ProductCart;
