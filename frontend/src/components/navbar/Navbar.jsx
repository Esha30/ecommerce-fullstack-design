import React, { useEffect, useState } from "react";
import { CountryDropdown } from "./Dropdown.flag ";
import LanguageDropdown from "./Dropdown.languages";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const FALLBACK_NAV = {
  allCategory: { label: "All category", to: "/category/AllCategory" },
  primaryLinks: [
    { label: "Hot offers", to: "/category/AllCategory" },
    { label: "Gift boxes", to: "/gift-boxes" },
    { label: "Projects", to: "/projects" },
    { label: "Menu items", to: "/menu-items" },
  ],
  helpLinks: [
    { label: "Help Center", to: "/help-center" },
    { label: "Contact Us", to: "/contact-us" },
  ],
};

export default function Navbar() {
  const [headerNav, setHeaderNav] = useState(FALLBACK_NAV);

  useEffect(() => {
    const loadHeaderNavigation = async () => {
      try {
        const res = await axiosInstance.get("/navigation/header");
        setHeaderNav({
          allCategory: res.data?.allCategory || FALLBACK_NAV.allCategory,
          primaryLinks: res.data?.primaryLinks || FALLBACK_NAV.primaryLinks,
          helpLinks: res.data?.helpLinks || FALLBACK_NAV.helpLinks,
        });
      } catch (error) {
        setHeaderNav(FALLBACK_NAV);
      }
    };

    loadHeaderNavigation();
  }, []);

  return (
    <nav className="hidden md:flex w-full bg-white border-b border-gray-200 justify-center">
      <div className="w-full max-w-[1180px] flex items-center justify-between py-3 px-0">
        <div className="flex items-center gap-6">
          <Link
            to={headerNav.allCategory.to}
            className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="font-medium text-[16px]">{headerNav.allCategory.label}</span>
          </Link>
          
          <div className="flex items-center gap-6">
            {headerNav.primaryLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-[16px] text-slate-800 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="text-[16px] text-slate-800 hover:text-blue-600 font-medium cursor-pointer flex items-center gap-1 transition-colors">
                Help
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100">
                {headerNav.helpLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <LanguageDropdown />
          <div className="flex items-center gap-1 text-slate-800 font-medium text-[16px] cursor-pointer hover:text-blue-600 transition-colors">
            <span>Ship to</span>
            <CountryDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
