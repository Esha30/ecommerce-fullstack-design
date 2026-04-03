import mongoose from "mongoose";
import Product from "../models/product.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const { search, category, sort, minPrice, maxPrice, inStock } = req.query;
    let query = {};
    const sortQuery = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category && category !== "AllCategory") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    if (sort === "price_asc") sortQuery.price = 1;
    if (sort === "price_desc") sortQuery.price = -1;
    if (sort === "newest") sortQuery.createdAt = -1;

    const products = await Product.find(query).sort(sortQuery);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    res.json(featuredProducts);
  } catch (error) {
    console.log("error in getFeaturedProducts route");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, images, category, stock } = req.body;
  if (!name || !description || !price || !category || !images) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let uploadedUrls = [];
    if (images && images.length > 0) {
      for (let base64 of images) {
        const result = await cloudinary.uploader.upload(base64);
        uploadedUrls.push(result.secure_url);
      }
    } else {
      return res.status(400).json({ message: "At least 1 image is required" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      images: uploadedUrls,
    });
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in creating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "product successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting product", error });
  }
};
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isFeatured = !product.isFeatured;
    await product.save();
    res
      .status(200)
      .json({ product: product, message: "Featured status updated", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle featured", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;

    if (images && images.length > 0) {
      let uploadedUrls = [];
      for (let base64 of images) {
        if (base64.startsWith("http") || base64.startsWith("/")) {
          uploadedUrls.push(base64);
        } else {
          const result = await cloudinary.uploader.upload(base64);
          uploadedUrls.push(result.secure_url);
        }
      }
      product.images = uploadedUrls;
    }

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
