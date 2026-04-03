export default function Banner() {
  return (
    <div className="w-full max-w-[1180px] rounded-md overflow-hidden relative h-[120px] mb-4">
      {/* Dark blue background */}
      <div className="absolute inset-0 bg-[#005ADE]" />
      {/* Lighter blue skewed overlay */}
      <div
        className="absolute top-0 left-0 h-full w-[68%] bg-[#237CFF]"
        style={{ transform: "skewX(10deg)", transformOrigin: "top left" }}
      />
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-10">
        <div>
          <h2 className="text-[22px] font-bold text-white">Super discount on more than 100 USD</h2>
          <p className="text-white text-[14px] opacity-90 mt-1">Have you ever finally just write dummy info</p>
        </div>
        <button className="bg-[#FF9017] hover:bg-orange-500 transition-colors text-white font-semibold px-7 py-2.5 rounded-md text-[15px] whitespace-nowrap">
          Shop now
        </button>
      </div>
    </div>
  );
}
