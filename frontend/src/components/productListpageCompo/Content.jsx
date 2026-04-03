import ContentTop from "./ContentTop";
import GridView from "./GridView";
import ListView from "./ListView";
import useToggleStore from "../../stores/Toggle.store";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../stores/product.store";
import { useEffect } from "react";
import { useSaveForLaterStore } from "../../stores/saveForLater.store";

export default function Content({ filters, onChangeFilters, onClearFilters }) {
  const { view } = useToggleStore();
  const { category, keyword } = useParams();
  const { getAllProducts, products, loading } = useProductStore();
  const { getSaveForLaterItems, addToSaveForLater } = useSaveForLaterStore();

  useEffect(() => {
    const params = {};
    if (keyword) params.search = keyword;
    if (category && category !== "AllCategory") params.category = category;
    if (filters.sort && filters.sort !== "featured") params.sort = filters.sort;
    if (filters.minPrice !== "") params.minPrice = filters.minPrice;
    if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;
    if (filters.inStock) params.inStock = true;

    getAllProducts(params);
  }, [category, keyword, filters, getAllProducts]);

  useEffect(() => {
    getSaveForLaterItems();
  }, [addToSaveForLater, getSaveForLaterItems]);

  const searchedProducts = products || [];
  const activeFilters = [
    filters.sort !== "featured" ? `Sort: ${filters.sort}` : null,
    filters.minPrice !== "" ? `Min: $${filters.minPrice}` : null,
    filters.maxPrice !== "" ? `Max: $${filters.maxPrice}` : null,
    filters.inStock ? "In stock" : null,
  ].filter(Boolean);

  const removeFilter = (filter) => {
    if (filter.startsWith("Sort:")) onChangeFilters({ sort: "featured" });
    if (filter.startsWith("Min:")) onChangeFilters({ minPrice: "" });
    if (filter.startsWith("Max:")) onChangeFilters({ maxPrice: "" });
    if (filter === "In stock") onChangeFilters({ inStock: false });
  };

  return (
    <div className="flex-1 max-w-[920px]">
      <ContentTop
        searchedProducts={searchedProducts}
        filters={filters}
        onChangeFilters={onChangeFilters}
      />

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="hidden md:flex items-center flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#DEE2E7] rounded-md bg-white text-[#1C1C1C] text-[14px]"
            >
              <span>{filter}</span>
              <button
                onClick={() => removeFilter(filter)}
                className="w-4 h-4 flex items-center justify-center text-[#8B96A5] hover:text-red-500 transition-colors ml-1 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={onClearFilters}
            className="text-blue-600 text-[14px] hover:underline ml-1"
          >
            Clear all filter
          </button>
        </div>
      )}

      <div className="w-full">
        {loading && (
          <div className="w-full bg-white border border-[#DEE2E7] rounded-md p-6 mb-3 text-center">
            Loading products...
          </div>
        )}
        {!loading && searchedProducts.length === 0 && (
          <div className="w-full bg-white border border-[#DEE2E7] rounded-md p-6 mb-3 text-center">
            No products found for these filters.
          </div>
        )}
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <GridView searchedProducts={searchedProducts} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <ListView searchedProducts={searchedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
