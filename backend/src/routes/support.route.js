import express from "express";
import {
  getHelpCenter,
  submitContactMessage,
} from "../controllers/support.controller.js";

const router = express.Router();

router.get("/help-center", getHelpCenter);
router.post("/contact-us", submitContactMessage);

export default router;
