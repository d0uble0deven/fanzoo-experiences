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
    athlete: string;
    team: string;
    position: string;
  };
}

const CheckoutModal = ({ onClose, experience }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);

  console.log("experience", experience);

  const handlePayNow = async () => {
    setLoading(true);

    try {
      // Simulate payment success
      // const paymentStatus = "Success"; // Simulating a success status

      // Prepare the data for DynamoDB
      const bookingData = {
        experienceId: experience.id,
        userId: "test-user-id", // Replace with real user ID
        athlete: experience.athlete,
        position: experience.position,
        timestamp: new Date().toISOString(),
      };
      console.log("bookingData", bookingData);
      // Make a POST request to backend API to write to DynamoDB
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      console.log("response", response);
      if (response.ok) {
        window.location.href = "/Bookings";
      } else {
        alert("Sorry, an error occurred. Please try again.");
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
    onClose();
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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Complete Your Payment</h2>

        {/* Experience Details */}
        <div className={styles.experienceDetails}>
          <h3>{experience.name}</h3>
          <p>
            <strong>Price:</strong> ${experience.price.toFixed(2)}
          </p>
          <hr />
          <p>
            <strong>Athlete:</strong> {experience.athlete}
          </p>
          <p>
            <strong>Team:</strong> {experience.team}
          </p>
          <p>
            <strong>Position:</strong> {experience.position}
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <div className={styles.cardInput}>
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
