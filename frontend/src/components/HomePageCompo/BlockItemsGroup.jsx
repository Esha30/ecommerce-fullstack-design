import { Link } from "react-router-dom";
import { INTERIOR_ITEMS } from "../../utils/HomeMockData";

export default function BlockItemsGroup() {
  return (
    <div className="w-full max-w-[1180px] flex flex-col md:flex-row border border-gray-300 rounded-md bg-white overflow-hidden mt-5 shadow-sm">
      {/* Left Section: Banner */}
      <div className="w-full md:w-[280px] min-h-[257px] relative group h-[200px] md:h-auto bg-gray-50 flex items-center justify-center">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          src="/Image/BlockItemFirst.jpg"
          alt="Home and outdoor category"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute top-6 left-6 z-10 space-y-4">
          <h2 className="text-[20px] font-bold text-slate-800 leading-tight w-[140px]">
            Home and outdoor
          </h2>
          <button className="bg-white hover:bg-gray-100 text-slate-900 px-5 py-2 rounded-md font-bold text-[14px] shadow-sm transition-all duration-200">
            Source now
          </button>
        </div>
      </div>

      {/* Right Section: Grid of Items */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 grid-rows-2">
        {INTERIOR_ITEMS.map((itm, i) => (
          <Link
            key={i}
            to="/product/mock"
            className="h-[128px] p-4 flex flex-col justify-between relative cursor-pointer border-l border-t border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="z-10">
              <h3 className="text-slate-800 text-[16px] font-medium leading-tight">
                {itm.name}
              </h3>
              <p className="text-gray-400 text-[13px] mt-2 font-medium">
                From USD {itm.price}
              </p>
            </div>
            <div className="w-[82px] h-[82px] absolute bottom-2 right-2 flex items-center justify-center">
              <img 
                className="max-w-full max-h-full object-contain" 
                src={itm.image} 
                alt={itm.name} 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
