import Inquiry from "../models/inquiry.model.js";

export const createInquiry = async (req, res) => {
  try {
    const { productId, quantity, message } = req.body;
    if (!quantity || !message) {
      return res.status(400).json({ message: "Quantity and message are required" });
    }

    const newInquiry = new Inquiry({
      user: req.user._id,
      product: productId || null,
      quantity,
      message,
    });

    await newInquiry.save();

    res.status(201).json({ message: "Inquiry sent successfully", data: newInquiry });
  } catch (error) {
    console.error("Error in createInquiry:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("user", "username email")
      .populate("product", "name price category")
      .sort({ createdAt: -1 });
    res.status(200).json({ inquiries });
  } catch (error) {
    console.error("Error in getAllInquiries:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
