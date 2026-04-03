import express from "express";
import { getMessages, sendMessage, getAllMessagesForAdmin, adminReply } from "../controllers/message.controller.js";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getMessages);
router.post("/", protectedRoute, sendMessage);

router.get("/admin", protectedRoute, adminRoute, getAllMessagesForAdmin);
router.post("/admin/reply", protectedRoute, adminRoute, adminReply);

export default router;
