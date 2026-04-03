import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/newsletter/subscribe", { email });
      toast.success(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#EEEEEE] py-12 flex flex-col items-center justify-center gap-2 mt-8">
      <h1 className="text-[20px] font-bold text-[#1C1C1C]">Subscribe on our newsletter</h1>
      <p className="text-[16px] text-[#606060] mb-4 text-center max-w-md px-4">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-[400px] px-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#8B96A5"/>
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[40px] pl-10 pr-3 border border-[#DEE2E7] rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-[40px] px-6 bg-[#0D6EFD] text-white font-medium rounded-md hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}

