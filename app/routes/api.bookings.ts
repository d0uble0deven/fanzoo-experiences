import { ActionFunction } from "@remix-run/node";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "../../lib/awsConfig";

import { randomUUID } from "crypto";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  const { experienceId, userId, athlete, timestamp } = body;

  // Validate input
  if (!experienceId || !userId || !athlete || !timestamp) {
    return new Response("Invalid input", { status: 400 });
  }

  // Simulate payment success/failure
  const paymentStatus = Math.random() > 0.2 ? "Success" : "Failure";
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
};
