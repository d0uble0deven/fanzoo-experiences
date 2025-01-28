import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import styles from "../styles/CheckoutModal.module.css";

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
    description?: string;
  };
}

const CheckoutModal = ({ onClose, experience }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    setLoading(true);

    try {
      // Simulate payment success
      const paymentStatus = "Success"; // Simulating a success status

      // Prepare the data for DynamoDB
      const bookingData = {
        experienceId: experience.id,
        userId: "test-user-id", // Replace with real user ID or use authentication context
        athlete: experience.name,
        timestamp: new Date().toISOString(),
        paymentStatus,
      };

      // Make a POST request to your backend API to write to DynamoDB
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Payment successful!");
        window.location.href = "/success"; // Redirect to the success page
      } else {
        throw new Error("Failed to save booking to DynamoDB");
      }
    } catch (error) {
      console.error("Error processing payment or saving booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    alert("Payment cancelled.");
    onClose(); // Close the modal
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#32325d",
        iconColor: "#32325d",
      },
    },
    hidePostalCode: true,
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
