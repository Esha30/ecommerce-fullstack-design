import { useState, useEffect } from "react";
import { Upload, Loader, Save } from "lucide-react";
import { useProductStore } from "../../stores/product.store";
import toast from "react-hot-toast";

const categories = [
  "tech",
  "cloth",
  "interior",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const EditProductForm = ({ productToEdit, onCancel, onSaveSuccess }) => {
  const { updateProduct } = useProductStore();
  const [images, setImages] = useState(productToEdit?.images || []);

  const [editProduct, setEditProduct] = useState({
    name: productToEdit?.name || "",
    description: productToEdit?.description || "",
    price: productToEdit?.price || "",
    category: productToEdit?.category || "",
    stock: productToEdit?.stock || "",
    images: productToEdit?.images || [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productToEdit._id, editProduct);
      if (onSaveSuccess) onSaveSuccess();
    } catch {
      console.log("error updating a product", editProduct);
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];

    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select image files only");
        return;
      }

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      base64Images.push(base64);
    }

    setImages((prevImages) => {
      const updated = [...prevImages, ...base64Images];
      setEditProduct({ ...editProduct, images: updated });
      return updated;
    });
  };

  return (
    <div
      data-theme="white"
      className=" shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 ">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium ">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium ">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium ">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium ">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium ">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={editProduct.stock}
            onChange={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer py-2 px-3 border border-gray-400 rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload New Images
          </label>
          {editProduct.images && editProduct.images.length > 0 && (
            <span className="ml-3 text-green-600 text-sm">
              <span className="font-lg font-semibold ">{`(${images.length})`}</span>{" "}
              Images uploaded
            </span>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
