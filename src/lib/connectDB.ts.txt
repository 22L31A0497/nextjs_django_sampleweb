import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    // If already connected, return
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
