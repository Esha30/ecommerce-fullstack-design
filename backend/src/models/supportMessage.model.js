import mongoose from "mongoose";

const supportMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "General Inquiry", trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SupportMessage", supportMessageSchema);
