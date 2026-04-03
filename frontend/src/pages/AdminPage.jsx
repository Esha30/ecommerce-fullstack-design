import { PlusCircle, ShoppingBasket, MessageSquare, ClipboardList } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "../components/AdminPageCompo/CreateProductForm";
import ProductsList from "../components/AdminPageCompo/ProductsList";
import EditProductForm from "../components/AdminPageCompo/EditProductForm";
import AdminMessages from "../components/AdminPageCompo/AdminMessages";
import AdminInquiries from "../components/AdminPageCompo/AdminInquiries";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "inquiries", label: "Inquiries", icon: ClipboardList },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setActiveTab("edit");
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
    setActiveTab("products");
  };

  const handleEditSuccess = () => {
    setEditingProduct(null);
    setActiveTab("products");
  };

  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-base-200 h-auto relative overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8  text-center">
          Admin Dashboard
        </h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingProduct(null);
              }}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id || (activeTab === "edit" && tab.id === "products")
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList onEdit={handleEdit} />}
        {activeTab === "messages" && <AdminMessages />}
        {activeTab === "inquiries" && <AdminInquiries />}
        {activeTab === "edit" && editingProduct && (
          <EditProductForm
            productToEdit={editingProduct}
            onCancel={handleEditCancel}
            onSaveSuccess={handleEditSuccess}
          />
        )}
      </div>
    </div>
  );
};
export default AdminPage;
