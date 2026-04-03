export default function SideItems() {
  const products = [
    { name: "Men Blazers Sets Elegant Formal", price: "$7.00 - $99.50", img: "/Image/cloth/1.jpg" },
    { name: "Men Shirt Sleeve Polo Contrast", price: "$7.00 - $99.50", img: "/Image/cloth/2.jpg" },
    { name: "Apple Watch Series Space Gray", price: "$7.00 - $99.50", img: "/Image/cloth/3.jpg" },
    { name: "Basketball Crew Socks Long Stuff", price: "$7.00 - $99.50", img: "/Image/cloth/4.jpg" },
    { name: "New Summer Men's castrol T-Shirts", price: "$7.00 - $99.50", img: "/Image/cloth/5.jpg" },
  ];

  return (
    <div className="hidden md:flex w-full max-w-[260px] flex-shrink-0 bg-white border border-[#DEE2E7] rounded-md p-4 flex-col gap-3 h-fit">
      <h2 className="font-semibold text-[16px] text-[#1C1C1C]">You may like</h2>
      <div className="flex flex-col gap-4">
        {products.map((itm, i) => (
          <div key={i} className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[70px] h-[70px] flex-shrink-0 border border-[#DEE2E7] rounded-md overflow-hidden">
              <img className="w-full h-full object-cover" src={itm.img} alt={itm.name} />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-[14px] text-[#1C1C1C] font-medium leading-snug line-clamp-2">{itm.name}</p>
              <p className="text-[14px] text-[#8B96A5]">{itm.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
