import Newsletter from "../models/newsletter.model.js";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Strict email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Please provide a proper email." });
    }

    const disposableDomains = ["mailinator.com", "tempmail.com", "test.com", "example.com", "dummy.com", "foo.com", "bar.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      return res.status(400).json({ message: "This email domain is not allowed. Please use a real email." });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: "Successfully subscribed to our newsletter!" });
  } catch (error) {
    console.error("Error in subscribeNewsletter:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
