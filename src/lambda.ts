import serverless from "serverless-http";

import app from "./app.ts";
import { connectDatabase } from "./config/database.ts";

const serverlessHandler = serverless(app);

let connectionPromise: Promise<void> | null = null;

export const handler = async (event: any, context: any) => {
  // Allows Lambda to return without waiting for MongoDB's open connection
  context.callbackWaitsForEmptyEventLoop = false;

  // Reuse the MongoDB connection between warm Lambda invocations
  if (!connectionPromise) {
    connectionPromise = connectDatabase().catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  await connectionPromise;

  return serverlessHandler(event, context);
};