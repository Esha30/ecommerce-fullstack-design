import React, { useEffect, useState } from "react";
import HeaderForOtherPages from "../components/navbar/HeaderForMobile";
import { useMessageStore } from "../stores/message.store";
import { Send } from "lucide-react";

export default function MessagePage() {
  const { messages, loading, getMessages, sendMessage } = useMessageStore();
  const [content, setContent] = useState("");

  useEffect(() => {
    getMessages();
    const interval = setInterval(() => {
      getMessages();
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [getMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await sendMessage(content);
    setContent("");
  };

  return (
    <>
      <HeaderForOtherPages />
      <div data-theme="winter" className="w-full min-h-[calc(100vh-80px)] bg-base-200 flex flex-col items-center py-6 px-3">
        <div className="w-full max-w-[800px] bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden flex flex-col h-[70vh]">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Support Messages</h1>
            <span className="text-sm text-green-600 font-medium">Online</span>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#F8F9FA]">
            {loading && messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">Loading chat...</div>
            ) : messages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                Send a message to start the conversation!
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "self-end bg-blue-600 text-white rounded-br-none"
                      : "self-start bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <span
                    className={`text-[10px] mt-1 block ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border border-transparent rounded-full px-4 py-2 focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                type="submit"
                disabled={!content.trim()}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                <Send size={18} className="translate-x-[-1px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
