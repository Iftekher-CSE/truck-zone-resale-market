import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const { askingPrice, custEmail, _id, sellerEmail, productId } = booking;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ price: askingPrice }),
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [askingPrice]);

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        // set error from card information
        if (error) {
            setCardError(error.message);
        } else {
            setCardError("");
        }

        setProcessing(false);

        // reset state before confirmation
        setSuccessMessage("");
        setTransactionId("");

        // get payment confirmation after card information is ok
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: custEmail,
                },
            },
        });

        // set error from confirmation process
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        // if no err in payment process
        console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
            // set transaction info to db
            const paymentInfo = {
                paymentAmount: paymentIntent.amount,
                transactionId: paymentIntent.id,
                status: paymentIntent.status,
                custEmail,
                bookingId: _id,
                sellerEmail,
                productId,
            };
            fetch(`${process.env.REACT_APP_API_URL}/payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(paymentInfo),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        setSuccessMessage("Your Payment is Successful");
                        setTransactionId(paymentIntent.id);
                    }
                });
        }
    };

    return (
        <form className="w-full border border-yellow-500 shadow-xl py-20 px-10 rounded-lg" onSubmit={handleSubmit}>
            <CardElement
                className="p-4"
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            {/* error message */}
            <p className="text-red-500">{cardError}</p>

            {/* success message */}
            {transactionId && (
                <>
                    <p className="text-green-600">{successMessage}</p>
                    <p className="text-black">Transaction id is: {transactionId}</p>
                </>
            )}

            <button
                className="btn btn-warning w-full py-1 mt-4"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <SmallSpinner></SmallSpinner> : "Pay"}
            </button>
        </form>
    );
};

export default CheckoutForm;
