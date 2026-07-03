import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    // FIXED: If process.env.JWT_SECRET is missing or undefined, it falls back to your string safely
    const secretKey = process.env.JWT_SECRET || "manish@123@456";

    const token = jwt.sign({ userId }, secretKey, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sametSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;