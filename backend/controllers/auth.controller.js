import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        // 1. Destructure all possible frontend naming patterns safely
        const { 
            fullname, 
            fullName, 
            username, 
            email, 
            password, 
            confpassword, 
            confirmPassword, 
            gender 
        } = req.body;

        // 2. Fallback assignment (handles camelCase vs lowercase property keys)
        const finalFullName = fullname || fullName;
        const finalConfirmPassword = confpassword || confirmPassword;
        const finalGender = gender || "male";

        // 3. Validation Checks
        if (!finalFullName || !username || !password || !finalConfirmPassword) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        // 4. Match comparison with space trimming safety built-in
        if (password.trim() !== finalConfirmPassword.trim()) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

		// FIXED: Correct live API endpoint format for placeholders

        // 5. Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // 6. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 7. Setup profile picture placeholders
		// FIXED: Correct live API endpoint format for placeholders
const boyProfilePic = `https://avatar.iran.liara.run/username?username=${username}&gender=male`;
const girlProfilePic = `https://avatar.iran.liara.run/username?username=${username}&gender=female`;
      

        // 8. Construct new database document instance
        const newUser = new User({
            fullName: finalFullName,
            username,
            email: email || "", // Saves email if passed, falls back to empty string if missing from schema
            password: hashedPassword,
            gender: finalGender,
            profilePic: finalGender.toLowerCase() === "female" ? girlProfilePic : boyProfilePic,
        });

        if (newUser) {
            // Generate JWT token and set HTTP-only cookie
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            return res.status(400).json({ error: "Invalid user data structure" });
        }
    } catch (error) {
        console.error("Critical error inside signup controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Please enter all fields" });
        }

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

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
        console.error("Critical error inside login controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Critical error inside logout controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};