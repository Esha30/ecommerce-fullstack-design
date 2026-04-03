import ContentMain from "../components/DetailPageCompo/ContentMain";
import ContentMainForMobile from "../components/DetailPageCompo/ContentMainForMobile";
import NavBreadcrumb from "../components/productListpageCompo/NavBreadcrumb";
import SectionTwo from "../components/DetailPageCompo/SectionTwo";
import Section3 from "../components/DetailPageCompo/Section3";
import Banner from "../components/DetailPageCompo/Banner";
import Newsletter from "../components/Newsletter";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../stores/product.store";

export default function DetailPage() {
  const { id } = useParams();
  const { getAllProducts, getProductById, selectedProduct, loading: productLoading } = useProductStore();

  useEffect(() => {
    if (id && id !== "mock") {
      getProductById(id);
    }
  }, [id, getProductById]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Use the fetched product or null if it's "mock" or hasn't loaded yet
  const productToShow = id === "mock" ? null : selectedProduct;

  if (productLoading && !productToShow && id !== "mock") {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#f8f9fc]">
        Loading product details...
      </div>
    );
  }

  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-[#F7F8FA] flex flex-col items-center gap-5 pb-0"
    >
      {/* Breadcrumb */}
      <NavBreadcrumb />

      {/* Main Product Card — Desktop */}
      <ContentMain product={productToShow} />

      {/* Main Product Card — Mobile */}
      <ContentMainForMobile product={productToShow} />

      {/* Description Tabs + You May Like */}
      <SectionTwo product={productToShow} />

      {/* Related Products */}
      <Section3 />

      {/* Discount Banner */}
      <Banner />

      {/* Newsletter */}
      <div className="w-full">
        <Newsletter />
      </div>
    </div>
  );
}
