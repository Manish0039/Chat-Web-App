import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true, // Prevents cross-site scripting (XSS) attacks
        
        // 🌟 DYNAMIC CONFIGURATION FOR BOTH ENVIRONMENTS:
        sameSite: isProduction ? "none" : "lax", 
        secure: isProduction, // true on live HTTPS (Render), false on local HTTP
    });
};

export default generateTokenAndSetCookie;