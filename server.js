import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createRequestHandler } from "@remix-run/express";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "./lib/awsConfig";

const app = express();

// Test DynamoDB connection
async function testDynamoDB() {
  try {
    const data = await dbClient.send(new ListTablesCommand({}));
    console.log("Tables: ", data.TableNames);
  } catch (err) {
    console.error("Error: ", err);
  }
}

// Mock or fetch booking data from a database
app.get("/api/bookings", async (req, res) => {
  try {
    // Simulated data (replace with your database query logic)
    const bookings = [
      {
        id: "1",
        experienceName: "Basketball with Michael",
        price: 50,
        date: "2025-01-24",
      },
      {
        id: "2",
        experienceName: "Tennis with Serena",
        price: 100,
        date: "2025-01-23",
      },
    ];

    // Send response
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Use Remix's request handler for all other routes
app.all(
  "*",
  createRequestHandler({
    getLoadContext() {
      return {};
    },
  })
);

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testDynamoDB();
});
