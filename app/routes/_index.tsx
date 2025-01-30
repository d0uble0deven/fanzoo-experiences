import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutModal from "../components/CheckoutModal";
import SportsCardGrid from "../components/SportsCardGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styles from "../styles/Index.module.css";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Index() {
  return (
    <Elements stripe={stripePromise}>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.content}>
          <SportsCardGrid />
        </div>
        <Footer />
      </div>
    </Elements>
  );
}
