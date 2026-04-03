import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Sidebar({ filters, onChangeFilters, onClearFilters }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [localMin, setLocalMin] = useState(filters.minPrice);
  const [localMax, setLocalMax] = useState(filters.maxPrice);
  const activeCategory = category || "AllCategory";

  const categories = [
    { label: "All category", value: "AllCategory" },
    { label: "Tech", value: "tech" },
    { label: "Cloth", value: "cloth" },
    { label: "Interior", value: "interior" },
  ];

  useEffect(() => {
    setLocalMin(filters.minPrice);
    setLocalMax(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const applyPriceFilter = () => {
    onChangeFilters({ minPrice: localMin, maxPrice: localMax });
  };

  return (
    <div className="hidden md:block w-full md:min-w-[240px] max-w-[240px] h-auto pr-4">
      {/* Category */}
      <div className="collapse collapse-arrow bg-transparent rounded-none border-t border-gray-200">
        <input type="checkbox" className="peer" defaultChecked />
        <div className="collapse-title !p-0 !min-h-[48px] flex items-center font-semibold text-[#1C1C1C] text-[16px]">
          Category
        </div>
        <div className="collapse-content !p-0 pb-3">
          <ul className="space-y-2 text-[#505050] text-[16px]">
            {categories.map((cat) => (
              <li
                key={cat.value}
                onClick={() => navigate(`/category/${cat.value}`)}
                className={`hover:text-blue-600 cursor-pointer ${
                  activeCategory === cat.value ? "text-blue-600 font-medium" : ""
                }`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sort */}
      <div className="collapse collapse-arrow bg-transparent rounded-none border-t border-gray-200">
        <input type="checkbox" className="peer" defaultChecked />
        <div className="collapse-title !p-0 !min-h-[48px] flex items-center font-semibold text-[#1C1C1C] text-[16px]">
          Sort by
        </div>
        <div className="collapse-content !p-0 pb-3">
          <select
            value={filters.sort}
            onChange={(e) => onChangeFilters({ sort: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:border-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Availability */}
      <div className="collapse collapse-arrow bg-transparent rounded-none border-t border-gray-200">
        <input type="checkbox" className="peer" defaultChecked />
        <div className="collapse-title !p-0 !min-h-[48px] flex items-center font-semibold text-[#1C1C1C] text-[16px]">
          Availability
        </div>
        <div className="collapse-content !p-0 pb-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onChangeFilters({ inStock: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            <span className="text-[#1C1C1C] text-[16px] group-hover:text-blue-600 transition-colors">
              In stock only
            </span>
          </label>
        </div>
      </div>

      {/* Price range */}
      <div className="collapse collapse-arrow bg-transparent rounded-none border-t border-gray-200">
        <input type="checkbox" className="peer" defaultChecked />
        <div className="collapse-title !p-0 !min-h-[48px] flex items-center font-semibold text-[#1C1C1C] text-[16px]">
          Price range
        </div>
        <div className="collapse-content !p-0 pb-3">
          <div className="mt-2 px-1">
            <input
              type="range"
              min={0}
              max={999999}
              value={Number(localMax || 0)}
              onChange={(e) => setLocalMax(e.target.value)}
              className="range range-xs range-primary"
            />
            <div className="flex justify-between gap-2 mt-4">
              <div className="flex-1">
                <p className="text-[#1C1C1C] text-[14px] mb-1 font-medium">Min</p>
                <input
                  type="number"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  placeholder="0"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#1C1C1C] text-[14px] mb-1 font-medium">Max</p>
                <input
                  type="number"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full h-10 bg-white border border-[#DEE2E7] text-blue-600 font-medium rounded-md mt-4 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Apply
            </button>
            <button
              onClick={onClearFilters}
              className="w-full h-10 bg-white border border-[#DEE2E7] text-[#505050] font-medium rounded-md mt-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
