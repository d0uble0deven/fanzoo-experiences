import { useState } from "react";

const experiences = [
  { id: "1", name: "Basketball with Michael", athlete: "Michael Jordan" },
  { id: "2", name: "Tennis with Serena", athlete: "Serena Williams" },
];

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

export default function Index() {
  const [message, setMessage] = useState("");

  const handleBooking = async (experience: any) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experienceId: experience.id,
        userId: "user123",
        athlete: experience.athlete,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(`Booking confirmed: ${data.id}`);
    } else {
      setMessage("Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Book an Athlete Experience</h1>
      {experiences.map((exp) => (
        <div key={exp.id}>
          <h2>{exp.name}</h2>
          <button onClick={() => handleBooking(exp)}>Book Now</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
}
