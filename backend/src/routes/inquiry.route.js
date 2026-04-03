import express from "express";
import { createInquiry, getAllInquiries } from "../controllers/inquiry.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectedRoute, createInquiry);
router.get("/", protectedRoute, adminRoute, getAllInquiries);

export default router;
