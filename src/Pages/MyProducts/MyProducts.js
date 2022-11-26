import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { AuthContext } from "../../contexts/AuthProvider";

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deleteProduct, setDeleteProduct] = useState(null);

    // get all product of this user
    const { data: products = [], refetch } = useQuery({
        queryKey: ["allTrucks", user?.email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allTrucks/${user?.email}`, {});
            const data = await res.json();
            console.log(data);
            return data;
        },
    });

    // delete a product from db
    const deleteHandler = product => {
        fetch(`${process.env.REACT_APP_API_URL}/allTrucks/${product._id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success("Deleted Confirmed");
                    setDeleteProduct(null);
                    refetch();
                }
            });
    };

    return (
        <div>
            <SectionHeader>My Products List</SectionHeader>

            <div className="m-10">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Image</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Advertise</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr key={product._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <img className="w-24 shadow-xl rounded-xl" src={product?.productImage} alt="" />
                                    </td>
                                    <td>{product.brandName}</td>
                                    <td>{product.model}</td>
                                    <td>{parseInt(product.askingPrice).toLocaleString()}</td>
                                    <td>
                                        {product.askingPrice && !product?.sold && (
                                            <Link to={`/dashboard/payment/${product._id}`}>
                                                <button className="btn btn-primary btn-sm">Advertise</button>
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        <label
                                            onClick={() => setDeleteProduct(product)}
                                            htmlFor="confirm-modal"
                                            className="btn bg-red-500 btn-sm"
                                        >
                                            Delete
                                        </label>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {deleteProduct && (
                <ConfirmModal
                    modalData={deleteProduct}
                    title={`Delete A Posted Product`}
                    message={`Are you sure wants to delete ${deleteProduct?.model} product sales post? make sure you cannot recall it.`}
                    successAction={deleteHandler}
                    successBtnName={"Delete"}
                ></ConfirmModal>
            )}
        </div>
    );
};

export default MyProducts;
