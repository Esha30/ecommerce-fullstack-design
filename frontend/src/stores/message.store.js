import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set, get) => ({
  messages: [],
  loading: false,

  getMessages: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/messages");
      set({ messages: res.data.messages, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch messages");
    }
  },

  sendMessage: async (content) => {
    try {
      const res = await axiosInstance.post("/messages", { content });
      set((state) => ({
        messages: [...state.messages, res.data.data],
      }));
      toast.success("Message sent");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  getAdminMessages: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/messages/admin");
      set({ messages: res.data.messages, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch admin messages");
    }
  },

  sendAdminReply: async (userId, content) => {
    try {
      const res = await axiosInstance.post("/messages/admin/reply", {
        userId,
        content,
      });
      set((state) => ({
        messages: [...state.messages, res.data.data],
      }));
      toast.success("Reply sent");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reply");
    }
  },
}));
