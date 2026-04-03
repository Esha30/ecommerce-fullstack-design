import React from "react";
import Timer from "./Timer";
import { SALE_ITEMS } from "../../utils/HomeMockData";
import { Link } from "react-router-dom";

export default function SaleSection() {
  return (
    <div className="w-full max-w-[1180px] h-auto flex flex-col md:flex-row border border-gray-300 rounded-md bg-white overflow-hidden mt-5 shadow-sm">
      {/* Left Section: Timer & Title */}
      <div className="w-full md:w-[280px] p-6 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-200">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-slate-900">
            Deals and offers
          </h2>
          <p className="text-gray-500 text-[16px]">Hygiene equipments</p>
        </div>
        <div className="flex justify-start">
          <Timer targetDate="2030-01-01T00:00:00" />
        </div>
      </div>

      {/* Right Section: Product Grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-full">
        {SALE_ITEMS.map((itm, i) => (
          <Link
            key={i}
            to="/product/mock"
            className="flex flex-col items-center justify-center p-4 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="w-[140px] h-[140px] flex items-center justify-center mb-3">
              <img
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                src={itm.image}
                alt={itm.name}
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-[14px] text-gray-800 font-medium whitespace-nowrap">
                {itm.name}
              </p>
              <span className="inline-block bg-[#FFE3E3] text-[#EB001B] text-[12px] font-bold px-3 py-1 rounded-full">
                {itm.discount}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
