import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is not configured. API is running without a database connection.");
    return false;
  }
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
}

export async function closeDatabase() {
  await mongoose.connection.close();
}
