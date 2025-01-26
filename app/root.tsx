import { Meta, Links, Outlet, LiveReload, Scripts } from "@remix-run/react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Root() {
  stripePromise.then((stripe) => console.log("stripePromise: ", stripe));
  return (
    <Elements stripe={stripePromise}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <Scripts />
          {/* <LiveReload /> */}
        </body>
      </html>
    </Elements>
  );
}
