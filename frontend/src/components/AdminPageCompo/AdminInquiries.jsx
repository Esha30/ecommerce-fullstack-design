import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { ClipboardList, User, Package, MessageSquare, Clock } from "lucide-react";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await axiosInstance.get("/inquiries");
      setInquiries(res.data.inquiries);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch inquiries");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    const interval = setInterval(fetchInquiries, 10000); // 10s polling
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-8 text-center">Loading inquiries...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Supplier Inquiries (RFQ)</h2>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
          No inquiries recorded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* User & Message */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                    <User className="w-4 h-4" />
                    {inquiry.user?.username || "Unknown User"} ({inquiry.user?.email})
                  </div>
                  <div className="flex gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-800 font-medium leading-relaxed italic">
                      "{inquiry.message}"
                    </p>
                  </div>
                </div>

                {/* Product & Meta */}
                <div className="md:w-1/3 border-l border-gray-100 md:pl-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span className="font-bold">Quantity: {inquiry.quantity}</span>
                  </div>
                  {inquiry.product && (
                    <div className="p-2 bg-gray-50 rounded border border-gray-100 overflow-hidden">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Linked Product</p>
                      <p className="text-sm font-semibold truncate text-blue-800">{inquiry.product.name}</p>
                      <p className="text-xs text-gray-600">${inquiry.product.price} | {inquiry.product.category}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <Clock className="w-3 h-3" />
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
