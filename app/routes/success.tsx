import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

import styles from "../styles/SuccessPage.module.css";
import "@fontsource/roboto";

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
    <div className={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className={styles.title}>Your Bookings</h1>
      {bookings.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.bookingTable}>
            <thead>
              <tr className={styles.bookingTableHeader}>
                <th className={styles.bookingTableCell}>Experience</th>
                <th className={styles.bookingTableCell}>Athlete</th>
                <th className={styles.bookingTableCell}>Price</th>
                <th className={styles.bookingTableCell}>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={index % 2 === 0 ? styles.alternateRow : {}}
                >
                  <td className={styles.bookingTableCell}>
                    {booking.experienceName}
                  </td>
                  <td className={styles.bookingTableCell}>{booking.athlete}</td>
                  <td className={styles.bookingTableCell}>${booking.price}</td>
                  <td className={styles.bookingTableCell}>{booking.date}</td>
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
