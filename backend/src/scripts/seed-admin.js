import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const adminData = {
  username: "Admin User",
  email: "admin@example.com",
  password: "adminpassword123", // Will be hashed by pre-save hook
  role: "admin",
};

const seedAdmin = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin user already exists. Updating role to admin...");
      existingAdmin.role = "admin";
      await existingAdmin.save();
    } else {
      const admin = new User(adminData);
      await admin.save();
      console.log("Admin user created successfully!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
