import { Link } from "react-router-dom";
import { useSaveForLaterStore } from "../../stores/saveForLater.store";

export default function ListView({ searchedProducts }) {
  const { addToSaveForLater } = useSaveForLaterStore();

  return (
    <>
      {searchedProducts.map((itm, i) => {
        return (
          <div
            key={itm._id || i}
            className="w-full h-auto overflow-hidden p-4 border border-[#DEE2E7] rounded-md bg-white flex flex-col md:flex-row gap-4 hover:shadow-sm transition-shadow"
          >
            <Link to={`/product/${itm._id}`} className="flex-shrink-0 flex items-center justify-center bg-white rounded-md border border-gray-100">
              <div className="w-[184px] h-[184px] p-2 flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src={itm.images?.[0]}
                  alt={itm.name || "Product image"}
                />
              </div>
            </Link>
            <div className="flex-grow flex flex-col gap-1 relative">
              <div className="flex justify-between items-start">
                <Link to={`/product/${itm._id}`} className="text-[16px] font-medium text-[#1C1C1C] hover:text-blue-600 transition-colors line-clamp-2 pr-10">
                  {itm.name}
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToSaveForLater(itm._id);
                  }}
                  className="w-[40px] h-[40px] flex-shrink-0 border border-[#DEE2E7] rounded-md flex justify-center items-center hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 2.82495C14.76 2.82495 13.09 3.63495 12 4.91495C10.91 3.63495 9.24 2.82495 7.5 2.82495C4.42 2.82495 2 5.24495 2 8.32495C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32495C22 5.24495 19.58 2.82495 16.5 2.82495ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32495C4 6.32495 5.5 4.82495 7.5 4.82495C9.04 4.82495 10.54 5.81495 11.07 7.18495H12.94C13.46 5.81495 14.96 4.82495 16.5 4.82495C18.5 4.82495 20 6.32495 20 8.32495C20 11.215 16.86 14.065 12.1 18.375Z"
                      fill="#0D6EFD"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-[20px] font-bold text-[#1C1C1C]">${itm.price?.toFixed(2)}</span>
                {itm.oldPrice && (
                  <span className="text-[#8B96A5] line-through text-[16px]">
                    ${itm.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2 items-center text-[14px] mt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" 
                        fill={star <= Math.floor(itm.rating || 4) ? "#FF9017" : "#D5CDC5"} />
                    </svg>
                  ))}
                </div>
                <span className="text-[#FF9017] font-medium">{itm.rating || 4.5}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7] mx-1"></span>
                <span className="text-[#8B96A5]">{itm.reviews || 154} orders</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7] mx-1"></span>
                <span className="text-[#00B517] font-medium">Free Shipping</span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-[#505050] text-[16px] leading-[24px] line-clamp-2 max-w-2xl">
                  {itm.description}
                </p>
                <Link to={`/product/${itm._id}`} className="text-[#0D6EFD] font-medium hover:underline text-[16px] mt-1">
                  View details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
