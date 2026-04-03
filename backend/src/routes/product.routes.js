import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  toggleFeaturedProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/featuredProducts", getFeaturedProducts);
router.get("/:id", getProductById);
router.post("/", protectedRoute, adminRoute, createProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProduct);
router.put("/:id", protectedRoute, adminRoute, updateProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);
export default router;
