import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    // Hardcode your local connection string directly to test it
    const conn = await mongoose.connect("mongodb://localhost:27017/chatApp");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;