import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const booking = useLoaderData();
    return (
        <div className="py-10">
            <SectionHeader>
                Payment {booking.brandName} {booking.model}
            </SectionHeader>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
