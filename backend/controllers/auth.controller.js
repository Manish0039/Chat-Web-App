import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// A dummy hash generated once on server startup to fight timing attacks
const DUMMY_HASH = "$2a$10$Nxw1tXv70p8/TymH.eB.6O8gA4uA5v6W7gA4uA5v6W7gA4uA5v6W7";

export const signup = async (req, res) => {
    try {
        const { 
            fullname, fullName, 
            username, email, 
            password, 
            confpassword, confirmPassword, 
            gender 
        } = req.body;

        const finalFullName = fullname || fullName;
        const finalConfirmPassword = confpassword || confirmPassword;
        const finalGender = gender || "male";

        if (!finalFullName || !username || !password || !finalConfirmPassword) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        if (password.trim() !== finalConfirmPassword.trim()) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/username?username=${username}&gender=male`;
        const girlProfilePic = `https://avatar.iran.liara.run/username?username=${username}&gender=female`;
      
        const newUser = new User({
            fullName: finalFullName,
            username,
            email: email || "", 
            password: hashedPassword,
            gender: finalGender,
            profilePic: finalGender.toLowerCase() === "female" ? girlProfilePic : boyProfilePic,
        });

        // Save first to verify MongoDB accepted the document successfully
        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
        
   } catch (error) {
    console.error("================ ERROR ================");
    console.error(error);
    console.error("=======================================");

    return res.status(500).json({
        error: error.message,
        stack: error.stack,
    });
}
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Please enter all fields" });
        }

        const user = await User.findOne({ username });
        
        // If user doesn't exist, we compare against the DUMMY_HASH. 
        // This takes the exact same processing time, rendering timing attacks useless.
        const hashToCompare = user ? user.password : DUMMY_HASH;
        const isPasswordCorrect = await bcrypt.compare(password, hashToCompare);

        // Generic error message keeps our application secure
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
    console.error("================ ERROR ================");
    console.error(error);
    console.error("=======================================");

    return res.status(500).json({
        error: error.message,
        stack: error.stack,
    });
}
};

export const logout = (req, res) => {
    try {
        // secure: true and sameSite options ensure modern browsers handle clear correctly
        res.cookie("jwt", "", { 
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Critical error inside logout controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};