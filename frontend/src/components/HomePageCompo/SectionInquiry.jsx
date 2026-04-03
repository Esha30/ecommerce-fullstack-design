import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../stores/auth.store";

export default function SectionInquiry() {
  const { authUser } = useAuthStore();
  const [itemName, setItemName] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Pcs");
  const [loading, setLoading] = useState(false);

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please login to send an inquiry");
      return;
    }
    if (!itemName || !details || !quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const message = `${itemName}: ${details} (${quantity} ${unit})`;
      await axiosInstance.post("/inquiries", {
        quantity: parseInt(quantity),
        message: message,
      });
      toast.success("Inquiry sent successfully to all suppliers!");
      setItemName("");
      setDetails("");
      setQuantity("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1180px] h-auto lg:h-[446px] flex flex-col md:flex-row relative rounded-md overflow-hidden mt-5 shadow-sm border border-gray-300">
      <img
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        src="/Image/inc.png"
        alt="Inquiry background"
      />
      <div
        style={{
          background: "linear-gradient(94.99deg, #2C7CF1 7.19%, rgba(0, 209, 255, 0.5) 89.49%)",
        }}
        className="absolute inset-0 z-10"
      ></div>
      
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row justify-between items-center p-8 lg:p-12 gap-8">
        <div className="w-full lg:w-[440px] space-y-4 text-white">
          <h2 className="text-[24px] lg:text-[32px] font-bold leading-tight">
            An easy way to send requests to all suppliers
          </h2>
          <p className="hidden lg:block text-[16px] text-blue-50 opacity-90 leading-relaxed max-w-[390px]">
            Experience a streamlined way to connect with industry leaders and get the best quotes for your business needs.
          </p>
          <button 
            onClick={handleSendInquiry}
            className="lg:hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-bold text-[14px] shadow-lg transition-all duration-200"
          >
            Send inquiry
          </button>
        </div>

        {/* Inquiry Form */}
        <div className="hidden lg:block w-full lg:w-[491px] bg-white rounded-md p-6 space-y-5 shadow-xl">
          <h3 className="text-[20px] font-bold text-slate-800">Send quote to suppliers</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="What item you need?"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-slate-800 placeholder:text-gray-400"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              disabled={loading}
            />
            <textarea
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md h-[100px] outline-none focus:border-blue-500 text-slate-800 placeholder:text-gray-400 resize-none"
              placeholder="Type more details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={loading}
            ></textarea>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Quantity"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500 text-slate-800"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={loading}
              />
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                disabled={loading}
                className="w-[120px] px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white text-slate-800"
              >
                <option>Pcs</option>
                <option>Units</option>
                <option>Sets</option>
                <option>Boxes</option>
              </select>
            </div>
          </form>
          <button 
            onClick={handleSendInquiry}
            disabled={loading}
            className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-bold text-[15px] shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send inquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}

