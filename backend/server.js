import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Moved up with imports

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; 

// 🔴 FIXED: Removed trailing slash from the Vercel URL string

// ... other imports

app.use(cors({
    origin: "https://chat-web-app-three-livid.vercel.app", // 👈 Absolute exact match of your live Vercel frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`🚀 Server running on port ${PORT}`);
});