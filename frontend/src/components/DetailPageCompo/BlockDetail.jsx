import { useState } from 'react';

const TABS = ["Description", "Reviews", "Shipping", "About seller"];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M7.32917 13.2292L3.85417 9.75417L2.67084 10.9292L7.32917 15.5875L17.3292 5.58751L16.1542 4.41251L7.32917 13.2292Z" fill="#8B96A5"/>
  </svg>
);

export default function BlockDetail({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full max-w-[880px] bg-white border border-[#DEE2E7] rounded-md">
      {/* Tab Nav */}
      <div className="flex border-b border-[#DEE2E7]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3.5 text-[15px] font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#0D6EFD] text-[#0D6EFD]"
                : "border-transparent text-[#8B96A5] hover:text-[#1C1C1C]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "Description" && (
          <div className="flex flex-col gap-6">
            <p className="text-[#505050] text-[15px] leading-relaxed">
              {product?.description || "This item is lightweight, stylish, and perfect for daily use. It features a powerful processor, long battery life, and high-resolution camera. Built with premium plastic material, supports fast charging, and runs on the latest OS. Ideal for gaming, photography, and multitasking."}
            </p>

            {/* Spec Table */}
            <table className="border border-[#DEE2E7] text-[15px] w-full max-w-[540px]">
              <tbody>
                {[
                  ["Model", "#8786867"],
                  ["Style", "Classic style"],
                  ["Certificate", "ISO-898921212"],
                  ["Size", "34mm x 450mm x 19mm"],
                  ["Memory", "36GB RAM"],
                ].map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-[#EFF2F4]" : "bg-white"}>
                    <td className="px-4 py-2.5 border border-[#DEE2E7] text-[#505050] w-[180px]">{label}</td>
                    <td className="px-4 py-2.5 border border-[#DEE2E7] text-[#1C1C1C]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Feature List */}
            <div className="flex flex-col gap-3">
              {[
                "Some great feature name here",
                "Lorem ipsum dolor sit amet, consectetur",
                "Duis aute irure dolor in reprehenderit",
                "Some great feature name here",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-[#505050] text-[15px]">
                  <CheckIcon />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "Reviews" && (
          <p className="text-[#505050] text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        )}
        {activeTab === "Shipping" && (
          <p className="text-[#505050] text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        )}
        {activeTab === "About seller" && (
          <p className="text-[#505050] text-[15px] leading-relaxed">
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        )}
      </div>
    </div>
  );
}
