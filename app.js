import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json());

// Main base route
app.get("/", (req, res) => {
  res.send("Finance Backend API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});