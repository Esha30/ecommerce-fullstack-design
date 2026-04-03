import { GoogleGenerativeAI } from "@google/generative-ai";

const getOfflineReply = (message) => {
  const text = String(message || "").toLowerCase();

  if (text.includes("how are you") || text.includes("how was the shopping")) {
    return "Shopping is going great! If you tell me what you need, I can suggest products, compare options, and help you find the best value.";
  }

  if (text.includes("price") || text.includes("cost")) {
    return "I can help with pricing. Please share the product name and I will guide you to the item and its expected price range.";
  }

  if (text.includes("delivery") || text.includes("shipping")) {
    return "Shipping times usually depend on location and stock. Open the product page and checkout section to see the exact delivery estimate.";
  }

  if (text.includes("return") || text.includes("refund")) {
    return "For returns and refunds, check your order details and contact support with your order ID for the fastest help.";
  }

  return "I am here to help with products, pricing, shipping, and orders. Tell me what you are looking for and I will assist right away.";
};

export const generateChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in the environment.");
      return res.status(200).json({
        reply: getOfflineReply(message),
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Provide context to the AI about its role
    const systemInstruction = 
      "You are a helpful, friendly, and efficient AI assistant for an amazing e-commerce store. " +
      "Provide concise, polite, and helpful answers to the user's questions about products, store policies, or general inquiries.";
      
    const prompt = `${systemInstruction}\n\nUser: ${message}`;

    // Try newer model first, then stable fallbacks.
    const modelCandidates = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    let responseText = "";
    let lastError = null;

    for (const modelName of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        responseText = result?.response?.text?.() || "";
        if (responseText.trim()) break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!responseText.trim()) {
      throw lastError || new Error("No AI response generated");
    }

    res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(200).json({
      reply: getOfflineReply(req.body?.message),
    });
  }
};
