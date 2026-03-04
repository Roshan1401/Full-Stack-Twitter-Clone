import express from "express";
import cors from "cors";
import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path: "./.env",
});

console.log("Environment variables loaded:", process.env.PORT);
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/X-Clone`);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
