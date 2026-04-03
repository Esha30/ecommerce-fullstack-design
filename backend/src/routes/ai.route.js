import express from "express";
import { generateChatResponse } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", generateChatResponse);

export default router;
