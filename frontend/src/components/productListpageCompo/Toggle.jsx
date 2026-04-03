import { LayoutGrid, ListIcon } from "lucide-react";
import useToggleStore from "../../stores/Toggle.store";

export const Toggle = () => {
  const { setView, view } = useToggleStore();

  return (
    <div className="flex bg-white">
      <button
        onClick={() => setView("grid")}
        className={`flex items-center px-3 py-2 border-r border-[#DEE2E7] transition-colors
          ${view === "grid" ? "bg-[#EFF2F4]" : "bg-white hover:bg-gray-50"}`}
        aria-label="Grid view"
      >
        <div className="w-5 h-5 flex justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3H3V11H11V3Z" fill={view === "grid" ? "#1C1C1C" : "#8B96A5"} />
            <path d="M11 13H3V21H11V13Z" fill={view === "grid" ? "#1C1C1C" : "#8B96A5"} />
            <path d="M21 3H13V11H21V3Z" fill={view === "grid" ? "#1C1C1C" : "#8B96A5"} />
            <path d="M21 13H13V21H21V13Z" fill={view === "grid" ? "#1C1C1C" : "#8B96A5"} />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setView("list")}
        className={`flex items-center px-3 py-2 transition-colors
          ${view === "list" ? "bg-[#EFF2F4]" : "bg-white hover:bg-gray-50"}`}
        aria-label="List view"
      >
        <div className="w-5 h-5 flex justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8H3V4H21V8ZM21 10H3V14H21V10ZM21 16H3V20H21V16Z"
              fill={view === "list" ? "#1C1C1C" : "#8B96A5"}
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
