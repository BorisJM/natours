import axios from 'axios';
import { showAlert } from './alerts';

/* eslint-disable */

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51Ns8mJJUz1iIRTj97rxCEY5oub1ZQhYF92TvnUDnq3YBawHgzXBOIZkh1El9By3ZaOCr8JoeoBHn0mGVUfpLfTYg00Q3nhxV7r',
  );
  try {
    // 1) Get checkout session from endpoint API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
