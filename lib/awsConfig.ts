import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dbClient = new DynamoDBClient({
  region: "us-east-2", // Replace with your preferred AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
},
});

console.log("AWS AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
