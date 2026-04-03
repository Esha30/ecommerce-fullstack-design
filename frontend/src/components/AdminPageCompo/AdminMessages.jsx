import React, { useEffect, useState, useRef } from "react";
import { useMessageStore } from "../../stores/message.store";
import { User, Send, MessageSquare } from "lucide-react";

export default function AdminMessages() {
  const { messages, loading, getAdminMessages, sendAdminReply } = useMessageStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    getAdminMessages();
    const interval = setInterval(() => {
      getAdminMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, [getAdminMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  // Group messages by user
  const groupedMessages = messages.reduce((acc, msg) => {
    // If msg.user is populated it's an object, otherwise it's an ID
    const userId = msg.user?._id || msg.user;
    if (!userId) return acc;
    
    if (!acc[userId]) {
      acc[userId] = {
        userData: typeof msg.user === 'object' ? msg.user : null,
        chats: [],
      };
    }
    // Update userData if we encounter a populated version
    if (typeof msg.user === 'object' && !acc[userId].userData?.username) {
      acc[userId].userData = msg.user;
    }
    acc[userId].chats.push(msg);
    return acc;
  }, {});

  const usersList = Object.keys(groupedMessages).map((id) => ({
    id,
    ...groupedMessages[id],
  }));

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !selectedUser) return;
    await sendAdminReply(selectedUser, replyContent);
    setReplyContent("");
  };

  const selectedUserChats = selectedUser ? groupedMessages[selectedUser]?.chats || [] : [];
  const selectedUserData = selectedUser ? groupedMessages[selectedUser]?.userData : null;

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex overflow-hidden border border-gray-200">
      {/* Sidebar: Users List */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Conversations
          </h2>
        </div>
        <div>
          {usersList.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500 italic">
              No messages yet
            </div>
          )}
          {usersList.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 transition-colors flex items-center gap-3 ${
                selectedUser === user.id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user.userData?.username || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.chats[user.chats.length - 1]?.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {selectedUserData?.username || "Unknown User"}
                </h3>
                <p className="text-xs text-gray-500">{selectedUserData?.email}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedUserChats.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "system" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm ${
                      msg.sender === "system"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`text-[10px] mt-1 opacity-70 ${
                        msg.sender === "system" ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendReply} className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!replyContent.trim()}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <MessageSquare className="w-16 h-16 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
