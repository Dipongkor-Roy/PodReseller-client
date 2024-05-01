import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = () => {
    const axiosSecure=useAxiosSecure();
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const [clientSecret,setClientSecret]=useState('');
    const [transactionId,setTransactionId]=useState('');
    const [cart,refetch]=useCart();
    const {user}=useAuth();
    const totalPrice=cart.reduce((total,item)=>total+item.price,0);
    const stripe=useStripe();
    const elements=useElements();
    useEffect(()=>{
        if(totalPrice>0){
            axiosSecure.post('/create-payment-intent',{price:totalPrice})
            .then((res)=>{
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
                
            })
        }
    },[axiosSecure,totalPrice])
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
    }
    const card =elements.getElement(CardElement);
    if(card ===null){
        return;
    }
    const {error,paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card,
    })
    if (error) {
        console.log("error", error);
        setError(error.message);
      } else {
        console.log("PaymentMethod", paymentMethod);
        setError("");
      }
      //confirm payment
      const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
        })
        if(confirmError){
            console.log('confirm error')
          }
          else{
            console.log('Payment Intent :',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
              console.log('Transaction Id :',paymentIntent.id);
              setTransactionId(paymentIntent.id);
              
              //now payment save in db
              const payment={
                email:user.email,
                price:totalPrice,
                transactionId:paymentIntent.id,
                date:new Date(), //convet this into utc time
                cartIds:cart.map(item=>item._id),
                menuIds:cart.map(item=>item.menuItemId),
                status:'pending'
              }
              const res= await axiosSecure.post('/payments',payment);
              console.log(res.data)
              refetch();
              if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you",
                    showConfirmButton: false,
                    timer: 1000
                });
      
                navigate('/dashboard/paymentHistory');
              }
            }
          };

    
    return (
        <div>
            <h2>Checkout</h2>
        </div>
    );
};

export default CheckoutForm;