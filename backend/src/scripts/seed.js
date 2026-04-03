import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.models.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    category: "tech",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],
    isFeatured: true
  },
  {
    name: "Cotton Casual T-Shirt",
    description: "Comfortable and breathable cotton t-shirt for everyday wear.",
    price: 19.99,
    category: "cloth",
    stock: 200,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"],
    isFeatured: true
  },
  {
    name: "Modern Minimalist Lamp",
    description: "A stylish desk lamp perfect for interior decoration.",
    price: 45.00,
    category: "interior",
    stock: 30,
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"],
    isFeatured: false
  },
  {
    name: "Gaming Smartphone",
    description: "High performance smartphone tailored for mobile gaming.",
    price: 699.00,
    category: "tech",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80"],
    isFeatured: false
  },
  {
    name: "Leather Jacket",
    description: "Premium leather jacket, perfect for cold weather.",
    price: 150.00,
    category: "cloth",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"],
    isFeatured: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Database seeded successfully with sample products");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
