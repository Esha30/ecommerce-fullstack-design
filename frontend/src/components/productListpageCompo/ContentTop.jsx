import React from 'react'
import { Toggle } from './Toggle';

export default function ContentTop({ searchedProducts, filters, onChangeFilters }) {
  return (
    <div className="hidden md:flex w-full mb-4 justify-between items-center px-4 py-3 border border-[#DEE2E7] rounded-md bg-white shadow-sm">
      <div className="text-[16px] text-[#1C1C1C]">
        <span>{searchedProducts.length} items found</span>
      </div>
      
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-[16px] text-[#1C1C1C]">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onChangeFilters({ inStock: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span>In stock only</span>
        </label>

        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => onChangeFilters({ sort: e.target.value })}
            className="bg-white border border-[#DEE2E7] rounded-md px-3 py-1.5 min-w-[120px] text-[16px] text-[#1C1C1C] cursor-pointer appearance-none pr-8 focus:outline-none focus:border-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
          <Toggle />
        </div>
      </div>
    </div>
  );
}
