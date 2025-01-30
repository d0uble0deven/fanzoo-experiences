import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import styles from "../styles/SuccessPage.module.css";

interface Booking {
  id: string;
  experienceId?: string;
  experienceName?: string;
  athlete?: string;
  price?: number;
  timestamp?: string;
}

export default function SuccessPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();

        console.log("API Response:", data);

        const formattedBookings = data.map((booking: any) => ({
          id: booking.id || "N/A",
          experienceName: booking.experienceName || "Unknown Experience",
          athlete: booking.athlete || "Unknown Athlete",
          price: booking.price || "N/A",
          date: booking.timestamp
            ? new Date(booking.timestamp).toLocaleDateString()
            : "N/A",
        }));

        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.successPage}>
      <h1 className={styles.title}>Success! Your Booking Details</h1>

      {bookings.length > 0 ? (
        <div className={styles.tableContainer}>
          <h2>Your Bookings</h2>
          <table className={styles.bookingTable}>
            <thead>
              <tr>
                <th>Experience</th>
                <th>Athlete</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.experienceName}</td>
                  <td>{booking.athlete}</td>
                  <td>${booking.price}</td>
                  <td>{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noBookings}>No bookings found.</p>
      )}

      <Link to="/" className={styles.backButton}>
        Book More Experiences
      </Link>
    </div>
  );
}
