import dotenv from "dotenv";
dotenv.config();

import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "./lib/awsConfig";

async function testDynamoDB() {
  try {
    const data = await dbClient.send(new ListTablesCommand({}));
    console.log("Tables: ", data.TableNames);
  } catch (err) {
    console.error("Error: ", err);
  }
}

app.all("*", (req, res) => {
  console.log("Incoming Request:", req.method, req.url);
  requestHandler(req, res);
});

testDynamoDB();
