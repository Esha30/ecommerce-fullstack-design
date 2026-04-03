import React, { useEffect } from "react";
import HeaderForOtherPages from "../components/navbar/HeaderForMobile";
import SaveForLater from "../components/CartCompo.jsx/SaveForLater";
import Banner from "../components/DetailPageCompo/Banner";
import { useSaveForLaterStore } from "../stores/saveForLater.store";

export default function FavoritesPage() {
  const { getSaveForLaterItems, loading } = useSaveForLaterStore();

  useEffect(() => {
    getSaveForLaterItems();
  }, [getSaveForLaterItems]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#f8f9fc]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <HeaderForOtherPages />
      <div
        data-theme="winter"
        className="w-full min-h-screen bg-base-200 flex flex-col items-center gap-y-4 pt-5 pb-10"
      >
        <div className="w-full max-w-[1180px] px-3">
          <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
          <SaveForLater />
        </div>
        <div className="w-full max-w-[1180px] px-3 mt-8">
          <Banner />
        </div>
      </div>
    </>
  );
}
