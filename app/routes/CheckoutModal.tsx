import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import styles from "../CheckoutModal.module.css"; // Adjust if your CSS file has a different name

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY
);

interface CheckoutModalProps {
  onClose: () => void;
  experience: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
}

const CheckoutModal = ({ onClose, experience }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayNow = () => {
    setLoading(true);

    // Simulate payment success
    setTimeout(() => {
      alert("Payment successful!");
      window.location.href = "/success"; // Redirect to the success page
    }, 1000);
  };

  const handleCancel = () => {
    alert("Payment cancelled.");
    onClose(); // Close the modal
  };

  // CardElement options: disabling validation feedback
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d", // Default text color
        "::placeholder": {
          color: "#aab7c4", // Placeholder color
        },
      },
      invalid: {
        color: "#32325d", // Neutral color to remove red error state
        iconColor: "#32325d", // Neutral color for error icon
      },
    },
    hidePostalCode: true, // Hides postal code field
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Complete Your Payment</h2>

        {/* Experience Details */}
        <div className={styles.experienceDetails}>
          <h3>{experience.name}</h3>
          <p>
            <strong>Description:</strong> {experience.description}
          </p>
          <p>
            <strong>Price:</strong> ${experience.price.toFixed(2)}
          </p>
          <p>
            <strong>Experience ID:</strong> {experience.id}
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <div className={styles.cardInput}>
            {/* CardElement configured to avoid showing red error styles */}
            <CardElement options={cardElementOptions} />
          </div>
        </Elements>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={styles.payNowButton}
            onClick={handlePayNow}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
