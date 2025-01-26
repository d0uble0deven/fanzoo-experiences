import Stripe from "stripe";

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});


export const action = async ({ request }: { request: Request }) => {
  const { experienceId, price } = await request.json();

  console.log("stripe: ", stripe)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Experience #${experienceId}`,
            },
            unit_amount: price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL}/success`,
      cancel_url: `${process.env.APP_URL}/cancel`,
    });

    console.log("process.env.APP_URL:", process.env.APP_URL);
    console.log("Checkout Session:", session);

    return new Response(JSON.stringify({ id: session.id }), {
        headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
  }
};
