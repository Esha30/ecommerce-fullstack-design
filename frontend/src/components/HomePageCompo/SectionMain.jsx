import React from "react";
import UserAction from "./UserAction";
import { Link } from "react-router-dom";

export default function SectionMain() {
  const items = [
    { name: "Automobiles", link: "/category/AllCategory" },
    { name: "Clothes and wear", link: "/category/cloth" },
    { name: "Home interiors", link: "/category/interior" },
    { name: "Computer and tech", link: "/category/tech" },
    { name: "Tools, equipments", link: "/category/AllCategory" },
    { name: "Sports and outdoor", link: "/category/AllCategory" },
    { name: "Animal and pets", link: "/category/AllCategory" },
    { name: "Machinery tools", link: "/category/AllCategory" },
    { name: "More category", link: "/category/AllCategory" },
  ];

  return (
    <div className="w-full max-w-[1180px] mx-auto h-auto md:h-[400px] flex md:justify-between items-start p-4 border border-gray-300 rounded-md bg-white gap-4 mt-5">
      {/* Sidebar Menu */}
      <div className="hidden lg:block w-[250px] h-full">
        <ul className="menu menu-md w-full p-0 gap-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <Link 
                to={item.link}
                className="text-[16px] text-gray-700 hover:bg-[#E5F1FF] hover:text-black rounded-md py-2 px-3 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Banner */}
      <div className="w-full lg:max-w-[665px] flex-1 h-[250px] md:h-full flex relative bg-cover bg-center rounded-sm overflow-hidden group">
        <img
          className="w-full h-full object-cover"
          src="/Image/15bee8c1b9d77e50133ea130b3270887efd96310.png"
          alt="Modern electronic items banner"
        />
        <div className="flex flex-col absolute gap-4 top-8 left-8 md:top-12 md:left-12">
          <div className="space-y-1">
            <h2 className="text-lg md:text-[28px] font-normal text-slate-800 tracking-tight">
              Latest trending
            </h2>
            <h1 className="text-xl md:text-[32px] font-bold text-slate-900 leading-tight">
              Electronic items
            </h1>
          </div>
          <button className="btn btn-sm md:btn-md bg-white border-none hover:bg-gray-100 text-slate-900 shadow-sm transition-all duration-200 w-fit px-6">
            Source now
          </button>
        </div>
      </div>

      {/* Right Panels */}
      <div className="hidden md:flex w-[200px] lg:w-[215px] h-full flex-col gap-3">
        <UserAction />
        <div className="w-full h-[95px] relative bg-[#F38332] text-white rounded-md p-4 flex flex-col justify-center shadow-sm">
          <p className="text-[14px] font-medium leading-tight w-[140px]">
            Get US $10 off with a new supplier
          </p>
        </div>
        <div className="w-full h-[95px] relative bg-[#55BDC3] text-white rounded-md p-4 flex flex-col justify-center shadow-sm">
          <p className="text-[14px] font-medium leading-tight w-[140px]">
            Send quotes with supplier preferences
          </p>
        </div>
      </div>
    </div>
  );
}
