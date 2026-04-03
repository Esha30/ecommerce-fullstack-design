import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/auth.store";
import { useLocation } from "react-router-dom";

// Layout Components
import Header from "./components/navbar/header";
import HeaderForMobile from "./components/navbar/HeaderForMobile";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import DetailPage from "./pages/DetailPage";
import AdminPage from "./pages/AdminPage";
import FavoritesPage from "./pages/FavoritesPage";
import MessagePage from "./pages/MessagePage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ContactUsPage from "./pages/ContactUsPage";

// Misc
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import FingerprintScan from "./components/CartCompo.jsx/FingerprintScan";
import PaymentSuccess from "./components/CartCompo.jsx/PaymentSuccess";
import AIChatbot from "./components/AIChatbot";

function App() {
  const location = useLocation();
  const { authUser, checkAuth, loader } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAppLoading = loader;

  if (isAppLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#f8f9fc]">
        <span className="text-slate-700 font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== "/success" &&
      location.pathname !== "/fingerprint" ? (
        <Header />
      ) : (
        ""
      )}
      {location.pathname !== "/cart" &&
      location.pathname !== "/fingerprint" &&
      location.pathname !== "/success" ? (
        <Navbar />
      ) : (
        ""
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cart"
            element={authUser ? <CartPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/admin"
            element={
              authUser?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
            }
          />
          <Route path="/product/:id?" element={<DetailPage />} />
          <Route path="/category/:category?" element={<ProductListPage />} />
          <Route path="/search/:keyword?" element={<ProductListPage />} />
          <Route path="/gift-boxes" element={<ProductListPage />} />
          <Route path="/projects" element={<ProductListPage />} />
          <Route path="/menu-items" element={<ProductListPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/fingerprint" element={<FingerprintScan />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route
            path="/favorites"
            element={authUser ? <FavoritesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/messages"
            element={authUser ? <MessagePage /> : <Navigate to="/" />}
          />

        </Routes>
      </main>

      {/* Footer */}
      {location.pathname !== "/success" &&
      location.pathname !== "/fingerprint" ? (
        <Footer />
      ) : (
        ""
      )}
      <AIChatbot />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
