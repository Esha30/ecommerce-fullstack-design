import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth.store";
import { useCartStore } from "../../stores/cart.store";
import toast from "react-hot-toast";
import { useSaveForLaterStore } from "../../stores/saveForLater.store";
import { axiosInstance } from "../../lib/axios";

export default function ContentMain({ product }) {
  const { addToCart } = useCartStore();
  const { authUser } = useAuthStore();
  const { addToSaveForLater } = useSaveForLaterStore();

  const handleAddToCart = () => {
    if (!authUser) { toast.error("Please login to add items to your cart."); return; }
    if (!product || product._id === "mock") { toast.error("Cannot add mock product to cart."); return; }
    if (product.stock <= 0) { toast.error("Product is out of stock"); return; }
    addToCart(product._id);
  };
  const handleAddToSaveForLater = () => {
    if (!authUser) { toast.error("Please login to save items for later."); return; }
    addToSaveForLater(product._id);
  };

  const handleSendInquiry = async () => {
    if (!authUser) { toast.error("Please login to send an inquiry."); return; }
    if (!product || product._id === "mock") { toast.error("Cannot send inquiry for mock product."); return; }
    
    const qty = window.prompt("Enter quantity you need:", "1");
    if (!qty) return;
    
    try {
      await axiosInstance.post("/inquiries", {
        productId: product._id,
        quantity: parseInt(qty),
        message: `Inquiry for ${product.name}. Requesting ${qty} units.`,
      });
      toast.success("Inquiry sent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send inquiry");
    }
  };

  const mockProduct = {
    _id: "mock",
    name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    price: 98.00,
    stock: 10,
    images: ["/Image/tech/1.jpg", "/Image/tech/2.jpg", "/Image/tech/3.jpg", "/Image/tech/4.jpg", "/Image/tech/5.jpg", "/Image/tech/6.jpg"],
    description: "This item is lightweight, stylish, and perfect for daily use. It features a powerful processor, long battery life, and high-resolution camera. Built with premium plastic material, supports fast charging, and runs on the latest OS. Ideal for gaming, photography, and multitasking.",
  };
  const p = product || mockProduct;

  const [img, setImg] = useState(p?.images?.[0] || "");
  const handleThumbnailClick = useCallback((itm) => { setImg(itm); }, []);
  useEffect(() => { if (p?.images?.[0]) setImg(p.images[0]); }, [p]);

  return (
    <div className="hidden sm:flex w-full max-w-[1180px] bg-white border border-[#DEE2E7] rounded-md p-5 gap-6">
      
      {/* Col 1 — Image Gallery */}
      <div className="flex flex-col gap-3 min-w-[220px] max-w-[240px]">
        <div className="w-full h-[290px] border border-[#DEE2E7] rounded-md flex justify-center items-center p-3 overflow-hidden">
          <img src={img} alt="product" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {p.images?.map((itm, i) => (
            <div
              key={i}
              onClick={() => handleThumbnailClick(itm)}
              className={`min-w-[56px] w-[56px] h-[56px] border rounded-md overflow-hidden cursor-pointer flex-shrink-0 ${img === itm ? "border-blue-500 border-2" : "border-[#DEE2E7]"}`}
            >
              <img src={itm} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Col 2 — Product Info */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* In Stock */}
        <div className="flex items-center gap-1 text-[#00B517] text-[14px] font-medium">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.32917 13.2292L3.85417 9.75417L2.67084 10.9292L7.32917 15.5875L17.3292 5.58751L16.1542 4.41251L7.32917 13.2292Z" fill="#00B517"/></svg>
          <span>In stock</span>
        </div>

        {/* Name */}
        <h1 className="text-[22px] font-semibold text-[#1C1C1C] leading-snug">{p.name}</h1>

        {/* Rating Row */}
        <div className="flex items-center gap-2 text-[14px] text-[#505050]">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill={s <= 4 ? "#FF9017" : "#D5CDC5"} />
              </svg>
            ))}
          </div>
          <span className="text-[#FF9017] font-semibold">9.3</span>
          <span className="text-[#DEE2E7]">•</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3.33332 3.33329H16.6667V13.3333H4.30832L3.33332 14.3083V3.33329ZM3.33332 1.66663C2.41666 1.66663 1.67499 2.41663 1.67499 3.33329L1.66666 18.3333L4.99999 15H16.6667C17.5833 15 18.3333 14.25 18.3333 13.3333V3.33329C18.3333 2.41663 17.5833 1.66663 16.6667 1.66663H3.33332ZM4.99999 9.99996H15V11.6666H4.99999V9.99996ZM4.99999 7.49996H15V9.16663H4.99999V7.49996ZM4.99999 4.99996H15V6.66663H4.99999V4.99996Z" fill="#8B96A5"/></svg>
            32 reviews
          </span>
          <span className="text-[#DEE2E7]">•</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 20 16" fill="none"><path d="M18.3333 5.90834H14.3417L10.6917 0.441675C10.5333 0.208342 10.2667 0.0916748 10 0.0916748C9.73334 0.0916748 9.46668 0.208342 9.30834 0.450008L5.65834 5.90834H1.66668C1.20834 5.90834 0.833344 6.28334 0.833344 6.74167C0.833344 6.81667 0.841677 6.89167 0.866677 6.96667L2.98334 14.6917C3.17501 15.3917 3.81668 15.9083 4.58334 15.9083H15.4167C16.1833 15.9083 16.825 15.3917 17.025 14.6917L19.1417 6.96667L19.1667 6.74167C19.1667 6.28334 18.7917 5.90834 18.3333 5.90834Z" fill="#8B96A5"/></svg>
            154 sold
          </span>
        </div>

        {/* Price Tiers */}
        <div className="flex bg-[#FFF0DF] rounded-md overflow-hidden">
          <div className="flex-1 px-4 py-3 border-r border-[#FFCD99]">
            <p className="text-[18px] font-bold text-[#FF4D4F]">${p.price?.toFixed(2) || "98.00"}</p>
            <p className="text-[13px] text-[#505050]">50-100 pcs</p>
          </div>
          <div className="flex-1 px-4 py-3 border-r border-[#FFCD99]">
            <p className="text-[18px] font-bold text-[#1C1C1C]">$90.00</p>
            <p className="text-[13px] text-[#505050]">100-700 pcs</p>
          </div>
          <div className="flex-1 px-4 py-3">
            <p className="text-[18px] font-bold text-[#1C1C1C]">$78.00</p>
            <p className="text-[13px] text-[#505050]">700+ pcs</p>
          </div>
        </div>

        {/* Details Table */}
        <div className="flex flex-col divide-y divide-[#DEE2E7] border-t border-[#DEE2E7]">
          {[
            ["Price:", "Negotiable"],
            ["Type:", "Classic shoes"],
            ["Material:", "Plastic material"],
            ["Design:", "Modern nice"],
            ["Customization:", "Customized logo and design custom packages"],
            ["Protection:", "Refund Policy"],
            ["Warranty:", "2 years full warranty"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 py-2.5">
              <span className="text-[#8B96A5] text-[15px] w-[140px] flex-shrink-0">{label}</span>
              <span className="text-[#1C1C1C] text-[15px]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3 — Supplier Card */}
      <div className="flex flex-col gap-4 min-w-[220px] max-w-[240px]">
        <div className="border border-[#DEE2E7] rounded-md p-4 flex flex-col gap-3">
          {/* Supplier Header */}
          <div className="flex gap-3 items-center">
            <div className="w-[40px] h-[40px] bg-[#DBF0F4] rounded-md flex items-center justify-center text-[#4CA7A7] text-[18px] font-bold flex-shrink-0">R</div>
            <div>
              <p className="text-[12px] text-[#8B96A5]">Supplier</p>
              <p className="text-[15px] font-semibold text-[#1C1C1C] leading-tight">Guanjoi Trading LLC</p>
            </div>
          </div>
          <div className="border-t border-[#DEE2E7]"></div>
          {/* Supplier Info */}
          <div className="flex items-center gap-2 text-[14px] text-[#505050]">
            <img className="w-[20px] h-[14px] object-cover rounded-sm" src="/Image/flags/Property 1=DE.png" alt="DE" onError={(e) => e.target.style.display='none'} />
            <span>Germany, Berlin</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#505050]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 0.833374L2.5 4.16671V9.16671C2.5 13.7917 5.7 18.1167 10 19.1667C14.3 18.1167 17.5 13.7917 17.5 9.16671V4.16671L10 0.833374ZM15.8333 9.16671C15.8333 12.9334 13.35 16.4084 10 17.4417C6.65 16.4084 4.16667 12.9334 4.16667 9.16671V5.25004L10 2.65837L15.8333 5.25004V9.16671ZM6.175 9.65837L5 10.8334L8.33333 14.1667L15 7.50004L13.825 6.31671L8.33333 11.8084L6.175 9.65837Z" fill="#8B96A5"/></svg>
            <span>Verified Seller</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#505050]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M9.99169 1.66663C5.39169 1.66663 1.66669 5.39996 1.66669 9.99996C1.66669 14.6 5.39169 18.3333 9.99169 18.3333C14.6 18.3333 18.3334 14.6 18.3334 9.99996C18.3334 5.39996 14.6 1.66663 9.99169 1.66663ZM15.7667 6.66663H13.3084C13.0417 5.62496 12.6584 4.62496 12.1584 3.69996C13.6917 4.22496 14.9667 5.29163 15.7667 6.66663ZM10 3.36663C10.6917 4.36663 11.2334 5.47496 11.5917 6.66663H8.40835C8.76669 5.47496 9.30835 4.36663 10 3.36663ZM3.55002 11.6666C3.41669 11.1333 3.33335 10.575 3.33335 9.99996C3.33335 9.42496 3.41669 8.86663 3.55002 8.33329H6.36669C6.30002 8.88329 6.25002 9.43329 6.25002 9.99996C6.25002 10.5666 6.30002 11.1166 6.36669 11.6666H3.55002ZM6.69169 6.66663H4.23335C5.03335 5.28329 6.30835 4.22496 7.84169 3.69996C7.34169 4.62496 6.95835 5.62496 6.69169 6.66663ZM10 16.6333C9.30835 15.6333 8.76669 14.525 8.40835 13.3333H11.5917C11.2334 14.525 10.6917 15.6333 10 16.6333ZM11.95 11.6666H8.05002C7.97502 11.1166 7.91669 10.5666 7.91669 9.99996C7.91669 9.43329 7.97502 8.87496 8.05002 8.33329H11.95C12.025 8.87496 12.0834 9.43329 12.0834 9.99996C12.0834 10.5666 12.025 11.1166 11.95 11.6666ZM12.1584 16.3C12.6584 15.375 13.0417 14.375 13.3084 13.3333H15.7667C14.9667 14.7083 13.6917 15.775 12.1584 16.3ZM13.6334 11.6666C13.7 11.1166 13.75 10.5666 13.75 9.99996C13.75 9.43329 13.7 8.88329 13.6334 8.33329H16.45C16.5834 8.86663 16.6667 9.42496 16.6667 9.99996C16.6667 10.575 16.5834 11.1333 16.45 11.6666H13.6334Z" fill="#8B96A5"/></svg>
            <span>Worldwide shipping</span>
          </div>
          {/* CTA Buttons */}
          <button
            onClick={handleAddToCart}
            className="w-full h-[40px] bg-[#0D6EFD] text-white rounded-md font-medium text-[15px] hover:bg-blue-700 transition-colors"
          >
            Add to cart
          </button>
          <button
            onClick={handleSendInquiry}
            className="w-full h-[40px] border border-[#0D6EFD] text-[#0D6EFD] rounded-md font-medium text-[15px] hover:bg-blue-50 transition-colors"
          >
            Send inquiry
          </button>
        </div>
        {/* Save for Later */}
        <button onClick={handleAddToSaveForLater} className="flex items-center gap-2 text-[#0D6EFD] text-[15px] font-medium hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16.5 2.82495C14.76 2.82495 13.09 3.63495 12 4.91495C10.91 3.63495 9.24 2.82495 7.5 2.82495C4.42 2.82495 2 5.24495 2 8.32495C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32495C22 5.24495 19.58 2.82495 16.5 2.82495ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32495C4 6.32495 5.5 4.82495 7.5 4.82495C9.04 4.82495 10.54 5.81495 11.07 7.18495H12.94C13.46 5.81495 14.96 4.82495 16.5 4.82495C18.5 4.82495 20 6.32495 20 8.32495C20 11.215 16.86 14.065 12.1 18.375Z" fill="#0D6EFD"/></svg>
          Save for later
        </button>
      </div>
    </div>
  );
}
