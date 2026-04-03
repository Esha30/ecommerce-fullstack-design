import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { axiosInstance } from "../lib/axios";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi there! I'm your AI Shopping Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axiosInstance.post("/ai/chat", { message: userMessage.text });
      setMessages((prev) => [...prev, { sender: "ai", text: response.data.reply }]);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[28rem] bg-base-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-base-200 transition-all duration-300 ease-in-out mb-4">
          
          {/* Header */}
          <div className="bg-primary text-primary-content p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <h3 className="font-bold text-lg">AI Assistant</h3>
            </div>
            <button onClick={toggleChat} className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-primary-focus">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-base-200">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full bg-base-300 flex items-center justify-center text-xl">
                     {msg.sender === "user" ? "👤" : "🤖"}
                  </div>
                </div>
                <div className={`chat-bubble text-sm shadow-sm ${msg.sender === "user" ? "chat-bubble-primary" : "bg-base-100 text-base-content"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full bg-base-300 flex items-center justify-center text-xl">
                    🤖
                  </div>
                </div>
                <div className="chat-bubble bg-base-100 text-base-content flex items-center gap-1">
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-base-100 border-t border-base-200">
            <form onSubmit={sendMessage} className="flex gap-2 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="input input-bordered input-sm w-full focus:outline-none focus:ring-2 focus:ring-primary pr-10 rounded-full"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-sm btn-circle absolute right-1 top-0 bottom-0 my-auto"
                disabled={isTyping || !input.trim()}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="btn btn-primary btn-circle btn-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-bounce float-right"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
