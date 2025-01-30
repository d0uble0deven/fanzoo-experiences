import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import styles from "../styles/SuccessPage.module.css";
import "@fontsource/roboto";

interface Booking {
  id: string;
  experienceId?: string;
  userId: string;
  athlete: string;
  timestamp: string;
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

        const formattedBookings = data.map((booking: any) => ({
          id: booking.id || "N/A",
          experienceId: booking.experienceId || "Unknown Experience",
          userId: booking.userId || "Unknown User",
          athlete: booking.athlete || "Unknown Athlete",
          timestamp: booking.timestamp
            ? new Date(booking.timestamp).toLocaleString()
            : "N/A",
        }));

        setBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={styles.successPage}>
      <h1 className={styles.title}>Your Bookings</h1>

      {bookings.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.bookingTable}>
            <thead>
              <tr className={styles.bookingTableHeader}>
                <th className={styles.bookingTableCell}>Experience ID</th>
                <th className={styles.bookingTableCell}>Athlete</th>
                <th className={styles.bookingTableCell}>User ID</th>
                <th className={styles.bookingTableCell}>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={index % 2 === 0 ? styles.alternateRow : ""}
                >
                  <td className={styles.bookingTableCell}>
                    {booking.experienceId}
                  </td>
                  <td className={styles.bookingTableCell}>{booking.athlete}</td>
                  <td className={styles.bookingTableCell}>{booking.userId}</td>
                  <td className={styles.bookingTableCell}>
                    {booking.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noBookings}>No bookings found.</p>
      )}

      <Link to="/">
        <button className={styles.backButton}>Book More Experiences</button>
      </Link>
    </div>
  );
}
