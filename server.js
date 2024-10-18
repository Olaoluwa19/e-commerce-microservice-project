import "dotenv/config";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// built-in middleware to handle urlencoded data i.e form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
