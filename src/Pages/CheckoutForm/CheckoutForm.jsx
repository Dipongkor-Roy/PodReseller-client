import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log("Payment Intent Created:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    console.log('Submit button clicked');
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      console.log("Card Element not found");
      return;
    }

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      console.error("Error creating payment method:", methodError);
      setError(methodError.message);
      return;
    }

    setError("");

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      console.error("Error confirming card payment:", confirmError);
      setError(confirmError.message);
      return;
    }

    console.log("Payment Intent:", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      console.log('Transaction succeeded:', paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map(item => item._id),
        menuIds: cart.map(item => item.menuItemId),
        status: "pending",
      };

      axiosSecure.post('/payments', payment)
        .then((res) => {
          console.log('Payment saved:', res.data);
          refetch();
          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate('/dashboard/paymentHistory');
          }
        })
        .catch((error) => {
          console.error("Error saving payment:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-orange-200/70 shadow-md rounded-xl text-white px-8 pt-6 pb-8 mb-4 w-96 h-44">
      <div className="mb-6">
        <div className="card-element-container">
          <CardElement
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
        </div>
        <p className="text-red-600 text-xs italic">{error}</p>
        {transactionId && (
          <p className="text-orange-500 text-xs italic">Your Transaction Id: {transactionId}</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-5">
        <button
          className="mt-5 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="mt-3 text-red-600">{error.message}</p>
      {
       transactionId && <p className="text-xl text-green-500">Your Transition Id: {transactionId}</p>
      }
      </div>
    </form>
  );
};

export default CheckOutForm;
