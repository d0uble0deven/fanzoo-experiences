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

export default function Index() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (experienceId: string, price: number) => {
    setLoading(true);

    try {
      // Call the backend to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experienceId, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json();
      alert(id);

      // Redirect to Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${id}`;
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const experiences = [
    { id: "1", name: "Basketball with Michael", price: 50 },
    { id: "2", name: "Tennis with Serena", price: 100 },
  ];

  return (
    <div>
      {experiences.map((exp) => (
        <div key={exp.id}>
          <h2>{exp.name}</h2>
          <p>${exp.price}</p>
          <button
            onClick={() => handleCheckout(exp.id, exp.price)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </div>
      ))}
    </div>
  );
}
