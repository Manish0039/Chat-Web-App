import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // 1. Grab the cookie token safely
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // 2. Verify token using your secret key fallback match
        const secretKey = process.env.JWT_SECRET || "manish@123@456";
        const decoded = jwt.verify(token, secretKey);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // 3. Find the user and attach it to the req object
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // <-- THIS POPS req.user INTO EXISTENCE FOR YOUR CONTROLLER

        next(); // Move forward to getUsersForSidebar
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;