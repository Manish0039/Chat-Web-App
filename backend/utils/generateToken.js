import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const secretKey = process.env.JWT_SECRET || "manish@123@456";

    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: "15d",
    });

    // Determine if we are running locally or live
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS attacks
        // 🔴 FIXED: Dynamic settings so cookies work BOTH locally and on Vercel/Render
        sameSite: isProduction ? "none" : "lax", 
        secure: isProduction ? true : false 
    });
};

export default generateTokenAndSetCookie;