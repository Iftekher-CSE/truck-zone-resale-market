import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { AuthContext } from "../../contexts/AuthProvider";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`, {});
            const data = await res.json();
            console.log(data);
            return data;
        },
    });

    // delete a product from order list if not paid
    const deleteHandler = booking => {
        fetch(`${process.env.REACT_APP_API_URL}/bookings/${booking._id}`, {
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
            <SectionHeader>My Orders List</SectionHeader>

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
                                <th>Delete</th>
                                <th>Payment</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking, index) => (
                                <tr key={booking._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <img className="w-24 shadow-xl rounded-xl" src={booking?.productImage} alt="" />
                                    </td>
                                    <td>{booking.brandName}</td>
                                    <td>{booking.model}</td>
                                    <td>{parseInt(booking.askingPrice).toLocaleString()}</td>
                                    <td>
                                        <label
                                            onClick={() => setDeleteProduct(booking)}
                                            htmlFor="confirm-modal"
                                            className="btn bg-red-500 btn-sm"
                                            disabled={booking.sold}
                                        >
                                            Delete
                                        </label>{" "}
                                    </td>
                                    <td>
                                        {booking.askingPrice && !booking.sold && (
                                            <Link to={`/payment/${booking._id}`}>
                                                <button className="btn btn-primary btn-sm">Pay</button>
                                            </Link>
                                        )}
                                        {booking.askingPrice && booking.sold && (
                                            <span className="text-green-500 font-bold">Paid</span>
                                        )}
                                    </td>
                                    <td>
                                        {booking.askingPrice < 1000000
                                            ? ""
                                            : "You cannot pay 10,00,000 or more in a single transaction"}
                                        {booking.askingPrice && booking.sold && `TranID: ${booking.transactionId}`}
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
                    title={`Delete A Product from Order List`}
                    message={`Are you sure wants to delete ${deleteProduct?.model} product order List? No issue you can add it later.`}
                    successAction={deleteHandler}
                    successBtnName={"Delete"}
                ></ConfirmModal>
            )}
        </div>
    );
};

export default MyOrders;
