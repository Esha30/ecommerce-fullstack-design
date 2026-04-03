import NavBreadcrumb from '../components/productListpageCompo/NavBreadcrumb.jsx'
import MainCompo from '../components/productListpageCompo/MainCompo.jsx';
import NavForMobile from '../components/navbar/NavForMobile.jsx';
import Newsletter from '../components/Newsletter.jsx';
import HeaderForMobile from "../components/navbar/HeaderForMobile.jsx"

export default function ProductListPage() {
  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-[#F7F8FA] h-auto flex flex-col items-center"
    >
      <HeaderForMobile />
      <NavForMobile />
      <NavBreadcrumb />
      <MainCompo />
      <Newsletter />
    </div>
  );
}
