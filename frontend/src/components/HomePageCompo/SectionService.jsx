import React from 'react'
import { EXTRA_SERVICES } from '../../utils/HomeMockData';
import { Search, Package, Send, ShieldCheck } from "lucide-react";

export default function SectionService() {
  const getIcon = (name) => {
    switch (name) {
      case "search": return <Search className="w-6 h-6 text-slate-800" />;
      case "package": return <Package className="w-6 h-6 text-slate-800" />;
      case "send": return <Send className="w-6 h-6 text-slate-800" />;
      case "shield": return <ShieldCheck className="w-6 h-6 text-slate-800" />;
      default: return <Search className="w-6 h-6 text-slate-800" />;
    }
  };

  return (
    <div className="w-full max-w-[1180px] mt-8 mb-8">
      <h2 className="text-[24px] font-bold text-slate-800 mb-6 px-1">
        Our extra services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXTRA_SERVICES.map((itm) => (
          <div
            key={itm.id}
            className="flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="relative h-[120px]">
              <img 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                src={itm.image} 
                alt={itm.title} 
              />
              <div className="absolute -bottom-6 right-5 w-12 h-12 bg-[#D1E7FF] border-2 border-white rounded-full flex items-center justify-center shadow-sm z-20 hover:bg-[#B6D8FF] transition-colors">
                {getIcon(itm.iconName)}
              </div>
            </div>
            <div className="p-5 pt-8">
              <p className="text-[16px] font-medium text-slate-800 leading-tight pr-4">
                {itm.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
