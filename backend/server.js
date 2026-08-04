import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ==================== CORS ====================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  // Your current Vercel app
  "https://chat-web-app-xi-ten.vercel.app",

  // Keep previous Vercel domains if you still use them
  "https://chat-web-app-manish40.vercel.app",
  "https://chat-web-app-three-livid.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, Thunder Client, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ==================== Middleware ====================
app.use(express.json());
app.use(cookieParser());

// ==================== Routes ====================
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ==================== Health Check ====================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

// ==================== Start Server ====================
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});