import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }, business) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `http://localhost:3000/details/${business}?is_success=true`,
    cancelUrl: `http://localhost:3000/details/${business}?is_success=false`,
  });
}

//https://www.youtube.com/watch?v=YQjB1ZjTj8c
