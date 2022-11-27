import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    const { user } = useContext(AuthContext);
    // console.log(bookingProduct);

    const handelBooking = event => {
        event.preventDefault();
        const form = event.target;
        const custPhone = form.phone.value;
        const meetLocation = form.meetLocation.value;
        const custEmail = user.email;
        const brandName = bookingProduct.brandName;
        const model = bookingProduct.model;
        const askingPrice = bookingProduct.askingPrice;
        const productImage = bookingProduct.productImage;
        const sellerEmail = bookingProduct.sellerEmail;
        const booking = {
            productId: bookingProduct._id,
            custPhone,
            meetLocation,
            custEmail,
            askingPrice,
            productImage,
            sellerEmail,
            brandName,
            model,
        };

        console.log(booking);

        fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Booking Confirmed");
                    setBookingProduct(null);
                    // refetch();
                } else {
                    toast.error(data.message);
                }
            });
    };
    return (
        <div>
            <input type="checkbox" id="product-booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 className="text-xl font-bold">
                        Booking for:
                        <span className="bg-[#FBE122] text-[#23292E] rounded-md px-2">
                            {bookingProduct?.brandName} {bookingProduct?.model}
                        </span>
                    </h3>
                    <form onSubmit={handelBooking} className="text-center grid grid-cols-1 mt-10">
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            defaultValue={user?.displayName}
                            disabled
                            className="input input-bordered w-full mb-6"
                        />
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            defaultValue={user?.email}
                            disabled
                            className="input input-bordered w-full mb-6"
                        />
                        <input
                            name="phone"
                            type="number"
                            placeholder="Phone Number"
                            className="input input-bordered w-full mb-6"
                        />
                        <input
                            name="meetLocation"
                            type="text"
                            placeholder="Meeting Location"
                            className="input input-bordered w-full mb-6"
                        />
                        <input className="btn" type="submit" value="Confirm Booking" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
