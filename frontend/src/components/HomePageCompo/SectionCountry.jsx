import React from 'react'

export default function SectionCountry() {
  const countrys = [
    {
      desc: "shopname.ae",
      name: "Arab Emirates",
      img: "/Image/flags/Property 1=AE.png",
    },
    {
      desc: "shopname.it",
      name: "Italy",
      img: "/Image/flags/Property 1=IT.png",
    },
    {
      desc: "shopname.au",
      name: "Australia",
      img: "/Image/flags/Property 1=AU.png",
    },
    {
      desc: "shopname.cn",
      name: "China",
      img: "/Image/flags/Property 1=CN.png",
    },
    {
      desc: "shopname.dk",
      name: "Denmark",
      img: "/Image/flags/Property 1=DK.png",
    },
    {
      desc: "shopname.fr",
      name: "France",
      img: "/Image/flags/Property 1=FR.png",
    },
    {
      desc: "shopname.ru",
      name: "Russia",
      img: "/Image/flags/Property 1=RU.png",
    },
    {
      desc: "shopname.us",
      name: "United States",
      img: "/Image/flags/Property 1=US.png",
    },
    {
      desc: "shopname.ae",
      name: "Arabic Emirates",
      img: "/Image/flags/Property 1=AE.png",
    },
    {
      desc: "shopname.gb",
      name: "Great Britain",
      img: "/Image/flags/Property 1=GB.png",
    },
  ];

  return (
    <div className="w-full max-w-[1180px] mt-8 mb-12">
      <h2 className="text-[24px] font-bold text-slate-800 mb-6 px-1">
        Suppliers by region
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-4">
        {countrys.map((itm, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-pointer">
            <div className="w-9 h-6 overflow-hidden rounded-sm shadow-sm border border-gray-100">
              <img className="w-full h-full object-cover" src={itm.img} alt={itm.name} />
            </div>
            <div className="flex flex-col leading-tight">
              <p className='text-[16px] text-slate-800 font-medium group-hover:text-blue-600 transition-colors'>
                {itm.name}
              </p>
              <p className="text-[13px] text-gray-400">
                {itm.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
