import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newMessage = new Message({
      user: req.user._id,
      sender: "user",
      content,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllMessagesForAdmin = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("user", "username email")
      .sort({ createdAt: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getAllMessagesForAdmin controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminReply = async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: "User ID and content are required" });
    }

    const newMessage = new Message({
      user: userId,
      sender: "system",
      content,
    });

    await newMessage.save();

    // Populate user info so the admin panel can update correctly without refresh
    const populatedMessage = await Message.findById(newMessage._id).populate("user", "username email");

    res.status(201).json({ message: "Reply sent", data: populatedMessage });
  } catch (error) {
    console.error("Error in adminReply controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
