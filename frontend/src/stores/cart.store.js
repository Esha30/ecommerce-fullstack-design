import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,

  addToCart: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/cart", { productId });
      toast.success("Item added to cart successfully");
      const cartRes = await axiosInstance.get("/cart");
      set({ cartItems: cartRes.data.cartItems, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log("Error adding to cart:", error.message);
    }
  },


  getCartItems: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/cart");
      set({ cartItems: res.data.cartItems });
      set({ isLoading: false });
    } catch (error) {
      console.log("Error fetching cart items:", error.message);
      set({ isLoading: false });
    }
  },

  deleteCartItem: async (productId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.product?._id !== productId),
        isLoading: false
      }));
      toast.success("Item removed from cart successfully");
    } catch (error) {
      console.log("Error deleting cart item:", error.message);
      set({ isLoading: false });
    }
  },

  updateCartItem: async (productId, newQty) => {
    set({ isLoading: true });
    try {
      await axiosInstance.put("/cart", { productId, quantity: newQty });
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.product?._id === productId ? { ...item, quantity: newQty } : item
        ),
        isLoading: false
      }));
      toast.success("Quantity changed");
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.message);
    }
  },
}));
