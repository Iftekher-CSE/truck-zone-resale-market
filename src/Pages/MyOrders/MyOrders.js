import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const MyOrders = () => {
    const bookings = [];
    const doctor = {};
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
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={doctor?.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.appointmentDate}</td>
                                    <td>{booking.slot}</td>
                                    <td>
                                        {booking.price && !booking.paid && (
                                            <Link to={`/dashboard/payment/${booking._id}`}>
                                                <button className="btn btn-primary btn-sm">Pay</button>
                                            </Link>
                                        )}
                                        {booking.price && booking.paid && <span className="text-green-500">Paid</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
