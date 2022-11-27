import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Components/Button/PrimaryButton";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import SmallSpinner from "../../../Components/Spinner/SmallSpinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddAProduct = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data: truckCategories = [] } = useQuery({
        queryKey: ["categoryName"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categoryName`);
            const data = await res.json();
            // console.log(data);
            return data;
        },
    });

    const handelAProduct = data => {
        setLoading(true);
        // console.log(data);
        const image = data.productImage[0];
        const formData = new FormData();
        formData.append("image", image);
        fetch(process.env.REACT_APP_IMAGEBB_URL, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                // console.log(imageData);

                if (imageData.success) {
                    // console.log(imageData.data.display_url);
                    const postTime = Date.now();
                    const sellerEmail = user.email;
                    const productImage = imageData.data.display_url;
                    const postDetails = { ...data, postTime, productImage, sellerEmail };
                    console.log(postDetails);

                    // save product post info to database
                    fetch(`${process.env.REACT_APP_API_URL}/trucks`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(postDetails),
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success(`${data.model} posted for sales!`);
                                navigate("/my-products");
                            }
                        });
                }
                setLoading(false);
            });
    };

    return (
        <div>
            <SectionHeader>Add A Product to Sell</SectionHeader>
            <form className=" my-5 mx-20 border border-yellow-500 rounded-xl" onSubmit={handleSubmit(handelAProduct)}>
                <div className="card-body">
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Brand Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Brand Name"
                            className="input input-bordered"
                            {...register("brandName", {
                                required: "Truck Brand Name is required",
                            })}
                        />
                        <p className="text-red-600">{errors.brandName?.message}</p>
                    </div>

                    {/* model */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Truck Model</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Truck Model"
                            className="input input-bordered"
                            {...register("model", {
                                required: "Truck Model Name is required",
                            })}
                        />
                        <p className="text-red-600">{errors.model?.message}</p>
                    </div>

                    {/* select category based on database */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Category</span>
                        </label>
                        <select
                            {...register("catName", {
                                required: "Please select one",
                            })}
                            className="select select-bordered w-full"
                        >
                            {truckCategories.map(truckCategory => (
                                <option key={truckCategory._id} value={truckCategory.catName}>
                                    {truckCategory.catName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* capacity */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Carrying Capacity in Kg</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Capacity in Kg"
                            className="input input-bordered"
                            {...register("capacity", {
                                required: "Truck Carrying Capacity is required",
                            })}
                        />
                        <p className="text-red-600">{errors.BrandName?.message}</p>
                    </div>

                    {/* purchase price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Purchase Price in taka</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Purchase Price in taka"
                            className="input input-bordered"
                            {...register("purchasePrice", {
                                required: "purchase Price is required",
                            })}
                        />
                        <p className="text-red-600">{errors.purchasePrice?.message}</p>
                    </div>

                    {/*  milageKM*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Milage in KM</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Milage in KM"
                            className="input input-bordered"
                            {...register("milageKM", {
                                required: "Truck Carrying Capacity is required",
                            })}
                        />
                        <p className="text-red-600">{errors.milageKM?.message}</p>
                    </div>

                    {/*  registrationYear*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Registration Year</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Registration Year"
                            className="input input-bordered"
                            {...register("registrationYear", {
                                required: "Truck Registration Year is required",
                            })}
                        />
                        <p className="text-red-600">{errors.registrationYear?.message}</p>
                    </div>

                    {/* condition */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Truck Condition (Brief)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Truck Condition"
                            className="input input-bordered"
                            {...register("condition", {
                                required: "Truck Condition is required",
                            })}
                        />
                        <p className="text-red-600">{errors.condition?.message}</p>
                    </div>

                    {/* location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meeting Location</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Meeting Location"
                            className="input input-bordered"
                            {...register("location", {
                                required: "Meeting Location is required",
                            })}
                        />
                        <p className="text-red-600">{errors.location?.message}</p>
                    </div>

                    {/* <p>{signUpError ? signUpError : ""}</p> */}

                    {/* asking Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asking Price in taka</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Asking Price in taka"
                            className="input input-bordered"
                            {...register("askingPrice", {
                                required: "Truck asking Price is required",
                            })}
                        />
                        <p className="text-red-600">{errors.askingPrice?.message}</p>
                    </div>

                    {/* photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Truck Photo</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered"
                            {...register("productImage", {
                                required: "Photo is required",
                            })}
                        />
                        <p className="text-red-600">{errors.productImage?.message}</p>
                    </div>

                    <div className="form-control mt-6">
                        <PrimaryButton classes="text-2xl font-bold py-2">
                            {loading ? <SmallSpinner></SmallSpinner> : "Add Product"}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAProduct;
