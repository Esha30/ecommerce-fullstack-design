import { Link, useParams } from 'react-router-dom';

export default function NavBreadcrumb() {
  const { category, keyword } = useParams();

  return (
    <div className='hidden md:block w-[85%] h-auto py-4 px-0'>
      <div className="flex items-center text-[16px] text-[#8B96A5] gap-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="text-gray-400">&gt;</span>
        {keyword ? (
          <span className="text-[#8B96A5]">Search results for "{keyword}"</span>
        ) : (
          <>
            <Link to="/category/AllCategory" className="hover:text-blue-600 transition-colors">Category</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#8B96A5] font-medium">
              {category === "AllCategory" || !category ? "All category" : category}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
