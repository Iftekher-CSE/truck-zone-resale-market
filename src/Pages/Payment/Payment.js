import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Spinner from "../../Components/Spinner/Spinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const booking = useLoaderData();
    const { brandName, model, askingPrice, sellerEmail, productImage } = booking;
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Spinner></Spinner>;
    }
    return (
        <div className="py-10">
            <SectionHeader>
                Payment {booking.brandName} {booking.model}
            </SectionHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Payment Product Information</h2>
                        <p className="text-lg">
                            Booking for: {brandName} {model}
                        </p>
                        <p className="text-lg">Buying From: {sellerEmail}</p>
                        <p className="text-lg">Total Payment: {askingPrice}</p>
                    </div>
                    <figure>
                        <img src={productImage} alt="Shoes" />
                    </figure>
                </div>

                <div className="bg-base-100 shadow-xl rounded-xl my-auto">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
