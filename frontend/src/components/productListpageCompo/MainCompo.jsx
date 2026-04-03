import { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import HeaderForFilter from "./HeaderForFilter";

const DEFAULT_FILTERS = {
  sort: "featured",
  minPrice: "",
  maxPrice: "",
  inStock: false,
};

export default function MainCompo() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilters = (next) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="w-[85%] h-auto flex flex-col gap-4 py-4">
      <HeaderForFilter
        filters={filters}
        onChangeFilters={updateFilters}
        onClearFilters={clearFilters}
      />
      <div className="flex gap-4">
      <Sidebar
        filters={filters}
        onChangeFilters={updateFilters}
        onClearFilters={clearFilters}
      />
      <Content filters={filters} onChangeFilters={updateFilters} onClearFilters={clearFilters} />
      </div>
    </div>
  );
}
