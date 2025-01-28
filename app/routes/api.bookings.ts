import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "../../lib/awsConfig";

import { randomUUID } from "crypto";

// Create a new booking
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    const { experienceId, userId, athlete, timestamp } = body;

    // Validate input
    if (!experienceId || !userId || !athlete || !timestamp) {
      return new Response("Invalid input", { status: 400 });
    }

    // Simulate payment success/failure
    const paymentStatus = "Success"; // Always assume success for now
    console.log("paymentStatus: ", paymentStatus)
    if (paymentStatus === "Failure") {
      return new Response("Payment failed", { status: 400 });
    }

    // Store booking in DynamoDB
    const booking = {
      id: randomUUID(),
      experienceId,
      userId,
      athlete,
      timestamp,
      paymentStatus,
    };

    await dbClient.send(
      new PutItemCommand({
        TableName: "Bookings",
        Item: {
          id: { S: booking.id },
          experienceId: { S: booking.experienceId },
          userId: { S: booking.userId },
          athlete: { S: booking.athlete },
          timestamp: { S: booking.timestamp },
          paymentStatus: { S: booking.paymentStatus },
        },
      })
    );

    return new Response(JSON.stringify(booking), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing booking:", error);
    return new Response("Failed to create booking", { status: 500 });
  }
};

// Fetch all bookings
export const loader: LoaderFunction = async () => {
  try {
    const data = await dbClient.send(
      new ScanCommand({
        TableName: "Bookings",
      })
    );

    // Parse and format the bookings
    const bookings = data.Items?.map((item) => ({
      id: item.id?.S,
      experienceId: item.experienceId?.S,
      userId: item.userId?.S,
      athlete: item.athlete?.S,
      timestamp: item.timestamp?.S,
      paymentStatus: item.paymentStatus?.S,
    }));

    console.log("Fetched bookings:", bookings);

    return new Response(JSON.stringify(bookings || []), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response("Failed to fetch bookings", { status: 500 });
  }
};
