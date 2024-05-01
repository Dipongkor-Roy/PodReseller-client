
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const Payment = () => {
    return (
        <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements>
    );
};

export default Payment;