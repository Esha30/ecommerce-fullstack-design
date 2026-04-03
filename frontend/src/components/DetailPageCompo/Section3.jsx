import { Link } from 'react-router-dom';
import { useProductStore } from '../../stores/product.store';

const relatedMock = [
  { _id: "r1", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/1.jpg" },
  { _id: "r2", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/2.jpg" },
  { _id: "r3", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/3.jpg" },
  { _id: "r4", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/4.jpg" },
  { _id: "r5", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/5.jpg" },
  { _id: "r6", name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: "/Image/tech/6.jpg" },
];

export default function Section3() {
  const { products } = useProductStore();
  const items = products.length >= 6
    ? products.slice(0, 6).map(p => ({ _id: p._id, name: p.name, price: `$${p.price?.toFixed(2)}`, img: p.images?.[0] }))
    : relatedMock;

  return (
    <div className="w-full max-w-[1180px] bg-white border border-[#DEE2E7] rounded-md p-6 flex flex-col gap-5">
      <h2 className="font-semibold text-[18px] text-[#1C1C1C]">Related products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((itm, i) => (
          <Link key={i} to={`/product/${itm._id}`} className="flex flex-col gap-2 hover:opacity-90 transition-opacity">
            <div className="w-full aspect-square bg-[#F7F8FA] border border-[#DEE2E7] rounded-md overflow-hidden flex items-center justify-center p-2">
              <img className="max-w-full max-h-full object-contain" src={itm.img} alt={itm.name} />
            </div>
            <p className="text-[14px] text-[#1C1C1C] leading-snug line-clamp-2">{itm.name}</p>
            <p className="text-[14px] text-[#8B96A5]">{itm.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
