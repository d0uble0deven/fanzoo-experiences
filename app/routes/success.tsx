import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

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
        console.log("Fetched bookings - FE:", data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for booking your experience.</p>

      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking: any) => (
            <li key={booking.id}>
              athlete: {booking.athlete} - experienceName:{" "}
              {booking.experienceName} - ${booking.price} - userId:{" "}
              {booking.userId} - customerName: {booking.customerName} -
              timestamp: {booking.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      <Link to="/">
        <button style={{ marginTop: "20px" }}>Book More Experiences</button>
      </Link>
    </div>
  );
}
