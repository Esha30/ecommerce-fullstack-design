import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import saveForLater from "./routes/saveForLater.routes.js";
import aiRoute from "./routes/ai.route.js";
import messageRoute from "./routes/message.route.js";
import newsletterRoute from "./routes/newsletter.route.js";
import inquiryRoute from "./routes/inquiry.route.js";
import navigationRoute from "./routes/navigation.route.js";
import supportRoute from "./routes/support.route.js";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.routes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

try {
  app.use("/api/auth", authRoute);
} catch (err) {
  console.error("authRoute error", err);
}

try {
  app.use("/api/product", productRoute);
} catch (err) {
  console.error("productRoute error", err);
}

try {
  app.use("/api/cart", cartRoute);
} catch (err) {
  console.error("cartRoute error", err);
}

try {
  app.use("/api/saveForLater", saveForLater);
} catch (err) {
  console.error("saveForLater error", err);
}

try {
  app.use("/api/ai", aiRoute);
} catch (err) {
  console.error("aiRoute error", err);
}

try {
  app.use("/api/messages", messageRoute);
} catch (err) {
  console.error("messageRoute error", err);
}

try {
  app.use("/api/newsletter", newsletterRoute);
} catch (err) {
  console.error("newsletterRoute error", err);
}

try {
  app.use("/api/inquiries", inquiryRoute);
} catch (err) {
  console.error("inquiryRoute error", err);
}

try {
  app.use("/api/navigation", navigationRoute);
} catch (err) {
  console.error("navigationRoute error", err);
}

try {
  app.use("/api/support", supportRoute);
} catch (err) {
  console.error("supportRoute error", err);
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res, next) => {
    const filePath = path.join(__dirname, "../frontend", "dist", "index.html");
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Failed to serve frontend:", err);
        res.status(500).send("Something went wrong");
      }
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
 
