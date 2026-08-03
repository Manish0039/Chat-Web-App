import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://chat-web-app-three-livid.vercel.app",
  "https://chat-web-app-manish40.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman and same-origin requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});