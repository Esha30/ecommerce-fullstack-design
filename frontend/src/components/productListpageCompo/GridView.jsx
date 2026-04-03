import { Link } from "react-router-dom";
import { useSaveForLaterStore } from "../../stores/saveForLater.store";

export default function GridView({ searchedProducts }) {
  const { addToSaveForLater } = useSaveForLaterStore();

  return (
    <>
      {searchedProducts.map((itm, i) => (
        <div
          key={itm._id || i}
          className="w-full bg-white border border-[#DEE2E7] rounded-md p-4 flex flex-col hover:shadow-md transition-shadow relative group"
        >
          {/* Product Image */}
          <Link
            to={`/product/${itm._id}`}
            className="w-full h-[180px] flex items-center justify-center mb-4 bg-[#F7F8FA] rounded-md overflow-hidden"
          >
            <img
              className="max-w-full max-h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              src={itm.images?.[0]}
              alt={itm.name}
            />
          </Link>

          {/* Price Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#1C1C1C]">
                ${itm.price?.toFixed(2)}
              </span>
              {itm.oldPrice && (
                <span className="text-[14px] text-[#8B96A5] line-through">
                  ${itm.oldPrice?.toFixed(2)}
                </span>
              )}
            </div>
            {/* Heart / Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToSaveForLater(itm._id);
              }}
              className="w-8 h-8 border border-[#DEE2E7] rounded-md flex justify-center items-center hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 2.82495C14.76 2.82495 13.09 3.63495 12 4.91495C10.91 3.63495 9.24 2.82495 7.5 2.82495C4.42 2.82495 2 5.24495 2 8.32495C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32495C22 5.24495 19.58 2.82495 16.5 2.82495ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32495C4 6.32495 5.5 4.82495 7.5 4.82495C9.04 4.82495 10.54 5.81495 11.07 7.18495H12.94C13.46 5.81495 14.96 4.82495 16.5 4.82495C18.5 4.82495 20 6.32495 20 8.32495C20 11.215 16.86 14.065 12.1 18.375Z" fill="#8B96A5"/>
              </svg>
            </button>
          </div>

          {/* Stars + Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                    fill={star <= Math.floor(itm.rating || 4) ? "#FF9017" : "#D5CDC5"}
                  />
                </svg>
              ))}
            </div>
            <span className="text-[#FF9017] text-[14px] font-semibold">{itm.rating || 7.5}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${itm._id}`}
            className="text-[#505050] text-[14px] hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
          >
            {itm.name}
          </Link>
        </div>
      ))}
    </>
  );
}
