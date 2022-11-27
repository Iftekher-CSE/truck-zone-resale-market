import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { AuthContext } from "../../contexts/AuthProvider";

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [] } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`, {});
            const data = await res.json();
            console.log(data);
            return data;
        },
    });

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
                                <th>Payment</th>
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
                                        {booking.askingPrice && !booking.sold && (
                                            <Link to={`/payment/${booking._id}`}>
                                                <button className="btn btn-primary btn-sm">Pay</button>
                                            </Link>
                                        )}
                                        {booking.askingPrice && booking.sold && (
                                            <span className="text-green-500 font-bold">Paid</span>
                                        )}
                                        <br />
                                        {booking.askingPrice && booking.sold && `TranID: ${booking.transactionId}`}

                                        {booking.askingPrice < 1000000 ? "" : "***"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-right text-sm text-red-400">
                        *** You cannot pay 10,00,000 or more in a single transaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
