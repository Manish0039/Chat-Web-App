import express from "express";
import protectRoute from "../middleware/protectRoute.js"; // <-- MUST IMPORT THIS
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// The protectRoute middleware MUST run first to populate req.user!
router.get("/", protectRoute, getUsersForSidebar);

export default router;