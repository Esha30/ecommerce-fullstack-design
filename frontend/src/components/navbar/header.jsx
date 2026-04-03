import { Menu, User, MessageCircle, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { useCartStore } from "../../stores/cart.store";
import toast from "react-hot-toast";

export default function Header() {
  const { authUser } = useAuthStore();
  const { cartItems } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("/category/AllCategory");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm.trim()}`);
      return setSearchTerm("");
    }
    if (selectedCategory !== "") {
      navigate(selectedCategory);
    }
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 px-4 flex justify-center">
      <div className="w-full max-w-[1180px] flex items-center justify-between gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src="/Brand/logo-colored.jpg" 
              alt="Brand Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="hidden md:flex flex-1 max-w-[665px]">
          <div className="flex w-full border-2 border-blue-600 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-2 outline-none text-slate-700 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              onChange={handleChange}
              className="px-4 py-2 border-l border-gray-200 outline-none bg-white text-slate-600 cursor-pointer"
            >
              <option value="/category/AllCategory">All category</option>
              <option value="/category/tech">Tech</option>
              <option value="/category/cloth">Cloth</option>
              <option value="/category/interior">Interior</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-bold transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* User Actions Section */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => {
              !authUser
                ? document.getElementById("my_modal_3").showModal()
                : authUser.role === "admin"
                ? navigate("/admin")
                : document.getElementById("my_modal_4").showModal();
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <User className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-[12px] text-gray-500 mt-1">Profile</span>
          </div>

          <Link to="/messages" className="hidden md:flex flex-col items-center cursor-pointer group">
            <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-[12px] text-gray-500 mt-1">Messages</span>
          </Link>

          <Link to="/favorites" className="hidden md:flex flex-col items-center cursor-pointer group">
            <Heart className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-[12px] text-gray-500 mt-1">Favorites</span>
          </Link>

          <Link to="/cart" className="relative flex flex-col items-center group">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className="text-[12px] text-gray-500 mt-1">My Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
