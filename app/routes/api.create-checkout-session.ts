import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});


export const action = async ({ request }: { request: Request }) => {
    const { price } = await request.json();
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100, // Convert to cents
        currency: "usd",
        payment_method_types: ["card"],
      });

      console.log("paymentIntent: ", paymentIntent);
  
      return new Response(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
  };
  
