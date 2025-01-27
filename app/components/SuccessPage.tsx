import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Success! Your Booking Details</h1>
      <ul>
        {bookings.map((booking: any) => (
          <li key={booking.id}>
            <strong>{booking.experienceName}</strong> - ${booking.price} -{" "}
            {booking.date}
          </li>
        ))}
      </ul>
      <Link to="/">
        <button>Book More Experiences</button>
      </Link>
    </div>
  );
}
