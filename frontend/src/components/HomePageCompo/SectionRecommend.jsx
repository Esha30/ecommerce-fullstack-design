import React from "react";
import { Link } from "react-router-dom";
import { RECOMMENDED_ITEMS } from "../../utils/HomeMockData";

export default function SectionRecommend() {
  return (
    <div className="w-full max-w-[1180px] h-auto mt-8 px-4 lg:px-0">
      <h2 className="text-[24px] font-bold text-slate-800 mb-6">
        Recommended items
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[20px]">
        {RECOMMENDED_ITEMS.map((itm) => (
          <Link
            key={itm.id}
            to="/product/mock"
            className="flex flex-col bg-white border border-[#E0E0E0] rounded-[6px] p-4 hover:shadow-sm transition-shadow cursor-pointer h-full"
          >
            <div className="w-full h-[150px] flex items-center justify-center mb-4">
              <img 
                className="max-w-[140px] max-h-[140px] object-contain" 
                src={itm.image} 
                alt={itm.name} 
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-[16px] font-bold text-[#1C1C1C]">
                ${itm.price}
              </h3>
              <p className="text-[14px] text-[#8B96A5] leading-[20px] mt-1 line-clamp-2">
                {itm.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
