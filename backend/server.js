import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; // 👈 This line imports both app and server!

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// 🚨 CRUCIAL: Change app.listen to server.listen so Socket.io works!
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`🚀 Server running on port ${PORT}`);
});