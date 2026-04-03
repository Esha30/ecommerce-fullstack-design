import React, { useEffect } from "react";
import { useAuthStore } from "../../stores/auth.store";

export default function UserAction() {
  const { checkAuth, authUser, LogOut } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [LogOut, checkAuth]);

  const handleLoginClick = () => {
    document.getElementById("my_modal_3")?.showModal();
  };

  return (
    <div className="w-full h-[150px] relative bg-[#E3F0FF] rounded-md p-3 flex flex-col justify-between shadow-sm">
      {/* Avatar + Username */}
      <div className="flex items-center gap-3">
        <div className="min-w-[44px] h-[44px] rounded-full overflow-hidden border border-gray-100 bg-white shadow-sm">
          <img 
            className="w-full h-full object-cover" 
            src="/avatar=pic1.jpg" 
            alt="User avatar" 
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[16px] text-slate-800">
            Hi, {authUser?.username || "user"}
          </span>
          {!authUser && (
            <span className="text-[14px] text-slate-600">
              Let's get started
            </span>
          )}
        </div>
      </div>

      {/* User Actions */}
      <div className="flex flex-col gap-2">
        {!authUser ? (
          <>
            <button
              onClick={handleLoginClick}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[13px] font-medium transition-colors shadow-sm"
            >
              Join now
            </button>
            <button
              onClick={handleLoginClick}
              className="w-full py-2 bg-white hover:bg-gray-50 text-blue-600 border border-gray-200 rounded-md text-[13px] font-medium transition-colors shadow-sm"
            >
              Log in
            </button>
          </>
        ) : (
          <button
            onClick={LogOut}
            className="w-full py-2 bg-white hover:bg-gray-50 text-red-500 border border-red-100 rounded-md text-[13px] font-medium transition-colors shadow-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
