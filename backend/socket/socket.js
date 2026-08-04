import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

// ==========================
// Allowed Origins
// ==========================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  // Your Vercel Frontends
  "https://chat-web-app-three-livid.vercel.app",
  "https://chat-web-app-manish40.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://chat-web-app-xi-ten.vercel.app",
      "https://chat-web-app-manish40.vercel.app",
      "https://chat-web-app-three-livid.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

// ==========================
// Get Receiver Socket
// ==========================
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// ==========================
// Socket Connection
// ==========================
io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };