import React, { useState } from "react";
import { Toggle } from "./Toggle";

export default function HeaderForFilter({ filters, onChangeFilters, onClearFilters }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localMin, setLocalMin] = useState(filters.minPrice);
  const [localMax, setLocalMax] = useState(filters.maxPrice);

  const applyMobileFilters = () => {
    onChangeFilters({ minPrice: localMin, maxPrice: localMax });
    setIsFilterOpen(false);
  };

  return (
    <>
    <div className="md:hidden w-full  p-3 h-auto flex justify-between items-center bg-white shadow-sm">
      <div className="p-1 border flex gap-2 items-center border-gray-200 rounded-[6px]">
        <span>Sort:</span>
        <select
          value={filters.sort}
          onChange={(e) => onChangeFilters({ sort: e.target.value })}
          className="bg-white text-sm outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price_asc">Low to High</option>
          <option value="price_desc">High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="p-1 border flex gap-2 items-center border-gray-200 rounded-[6px]"
      >
        <span>Filter</span>
      </button>
      <div>
        <Toggle />
      </div>
    </div>
    {isFilterOpen && (
      <div className="md:hidden fixed inset-0 bg-black/40 z-50 flex items-end">
        <div className="w-full bg-white rounded-t-2xl p-4 space-y-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onChangeFilters({ inStock: e.target.checked })}
            />
            <span>In stock only</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
            <input
              type="number"
              placeholder="Max price"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={applyMobileFilters} className="flex-1 bg-blue-600 text-white py-2 rounded">
              Apply
            </button>
            <button
              onClick={() => {
                onClearFilters();
                setLocalMin("");
                setLocalMax("");
              }}
              className="flex-1 border border-gray-300 py-2 rounded"
            >
              Reset
            </button>
            <button onClick={() => setIsFilterOpen(false)} className="flex-1 border border-gray-300 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
