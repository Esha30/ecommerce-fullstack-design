import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import Newsletter from "../components/Newsletter";
import HeaderForMobile from "../components/navbar/HeaderForMobile";

export default function ContactUsPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.post("/support/contact-us", formData);
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-[#F7F8FA] flex flex-col items-center pb-0"
    >
      <HeaderForMobile />
      <div className="w-full max-w-[760px] bg-white border border-[#DEE2E7] rounded-md p-6 my-8 px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Need help? Send us a message and our team will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Subject (optional)"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            placeholder="Write your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="w-full mt-auto">
        <Newsletter />
      </div>
    </div>
  );
}
