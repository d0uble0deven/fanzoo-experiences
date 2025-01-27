/*
  TODO 
  create a glider of athlete cards

  when a card is clicked, it should opens a new page with the athlete's details and experiences

  add a book now button on both the page and details page that opens up the Stripe modal

  deploy app

  Next steps:
  - add the Stripe modal
  - add gliders with book now and details buttons
  - create mock data
  - create a new page for the athlete details
  - add stylings from Voyager
  - add search bar from Voyager
  
*/

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import CheckoutModal from "../components/CheckoutModal";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Index() {
  const [selectedExperience, setSelectedExperience] = useState<{
    id: string;
    price: number;
  } | null>(null);

  const experiences = [
    { id: "1", name: "Basketball with Michael", price: 50 },
    { id: "2", name: "Tennis with Serena", price: 100 },
  ];

  const handleBookNow = (experience: any) => {
    setSelectedExperience(experience);
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
  };

  return (
    <Elements stripe={stripePromise}>
      <div>
        {experiences.map((exp) => (
          <div key={exp.id}>
            <h2>{exp.name}</h2>
            <p>${exp.price}</p>
            <button onClick={() => handleBookNow(exp)}>Book Now</button>
          </div>
        ))}
      </div>

      {selectedExperience && (
        <CheckoutModal
          onClose={handleCloseModal}
          experience={selectedExperience}
        />
      )}
    </Elements>
  );
}
