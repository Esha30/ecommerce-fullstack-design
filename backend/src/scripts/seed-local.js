import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.models.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const products = [];

// Tech (1-10)
for (let i = 1; i <= 10; i++) {
  products.push({
    name: `Tech Gear ${i}`,
    description: `High-performance tech product, featuring state-of-the-art modern capabilities. Limited time discount!`,
    price: 199.99 + (i * 25),
    category: "tech",
    stock: 50 + i,
    images: [`/Image/tech/${i}.jpg`],
    isFeatured: i <= 3 // First 3 are featured
  });
}

// Cloth (1-7)
for (let i = 1; i <= 7; i++) {
  products.push({
    name: `Premium Apparel ${i}`,
    description: `Stylish, comfortable and breathable clothing perfect for everyday wear. Upgrade your wardrobe.`,
    price: 29.99 + (i * 10),
    category: "cloth",
    stock: 100 - i,
    images: [`/Image/cloth/${i}.jpg`],
    isFeatured: i <= 2 // First 2 are featured
  });
}

// Interior (1-10)
for (let i = 1; i <= 10; i++) {
  products.push({
    name: `Interior Design Element ${i}`,
    description: `Elegant and minimalist interior design set to brighten up your home and enhance any room's aesthetic.`,
    price: 89.99 + (i * 15),
    category: "interior",
    stock: 30 + (i * 2),
    images: [`/Image/interior/${i}.jpg`],
    isFeatured: i <= 3 // First 3 are featured
  });
}

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products.");

    // Insert sample products
    await Product.insertMany(products);
    console.log(`Successfully seeded database with ${products.length} local products!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
