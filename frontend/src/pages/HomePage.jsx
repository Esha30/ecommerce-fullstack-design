import SectionMain from "../components/HomePageCompo/SectionMain";
import SaleSection from "../components/HomePageCompo/SaleSection";
import BlockItemsGroup from "../components/HomePageCompo/BlockItemsGroup";
import BlockItemsGroup2 from "../components/HomePageCompo/BlockItemsGroup2";
import SectionInquiry from "../components/HomePageCompo/SectionInquiry";
import SectionRecommend from "../components/HomePageCompo/SectionRecommend";
import SectionService from "../components/HomePageCompo/SectionService";
import SectionCountry from "../components/HomePageCompo/SectionCountry";
import Newsletter from "../components/Newsletter";
import { useEffect } from "react";

export default function HomePage() {
  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-[#F7FAFC] flex flex-col items-center pb-0"
    >
      <div className="w-full max-w-[1180px] flex flex-col gap-6 px-4 md:px-0 mb-12">
        <SectionMain />
        <SaleSection />
        <BlockItemsGroup />
        <BlockItemsGroup2 />
        <SectionInquiry />
        <SectionRecommend />
        <SectionService />
        <SectionCountry />
      </div>
      <Newsletter />
    </div>
  );
}
