
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const Payment = () => {
    return (
        <Elements stripe={stripePromise} >
          <h3 className='sm:text-3xl font-gabarito title-font  text-orange-500/70 text-center font-extrabold text-4xl md:text-5xl tracking-tight my-5'>Payment</h3>
        <CheckoutForm />
      </Elements>
    );
};

export default Payment;