import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  loading: false,
  authUser: null,
  loader: true,

  Login: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Successfully Login");
      set({ loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error in login");
      console.log("error in login", error.message);
    }
  },

  Signup: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data.user });
      toast.success("Successfully Signed up!");
      set({ loading: false });
      return res.data.user;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error signing up");
      console.log("error in signup", error.message);
    }
  },



  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null, loader: false });
    } finally {
      set({ loader: false });
    }
  },




  LogOut: () => {
    axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Successfully logged out!");
  },
}));
