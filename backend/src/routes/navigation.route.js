import express from "express";
import { getHeaderNavigation } from "../controllers/navigation.controller.js";

const router = express.Router();

router.get("/header", getHeaderNavigation);

export default router;
