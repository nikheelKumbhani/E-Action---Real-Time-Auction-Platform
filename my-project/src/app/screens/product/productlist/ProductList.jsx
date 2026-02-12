import { React, useEffect, useState } from "react";
import { PrimaryButton, Title } from "../../../router";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsOfUser } from "@/app/redux/features/productSlice";
import { Table } from "@/app/components/Table";
import { sellProduct } from "@/app/redux/features/productSlice";

export const ProductList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { userproducts } = useSelector((state) => state.product);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllProductsOfUser()).then((action) => {
      // Log the products with bid counts
      if (action.payload) {
        console.log("Products with bid counts:", action.payload);
      }
    });
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      await dispatch(deleteProduct(id));
      dispatch(getAllProductsOfUser());
    }
  };

  const handleSellProduct = async (id) => {
    if (window.confirm("Are you sure you want to sell this product to the highest bidder?")) {
      await dispatch(sellProduct(id));
      dispatch(getAllProductsOfUser()); // Refresh the list
    }
  };

  const getProductStatus = (product) => {
    if (product.isSoldout) return "Sold";
    if (!product.verifyRequest) return "Pending Verification";
    if (!product.isPublished) return "Draft";
    return "Active";
  };

  // Filter products based on search and filter type
  const filteredProducts = userproducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "verified") return matchesSearch && product.verifyRequest;
    if (filterType === "unverified") return matchesSearch && !product.verifyRequest;
    if (filterType === "sold") return matchesSearch && product.isSoldout;
    if (filterType === "unsold") return matchesSearch && !product.isSoldout;
    
    return matchesSearch;
  });

  // Get formatted product data with all necessary details
  const getFormattedProducts = (products) => {
    return products.map(product => ({
      _id: product._id,
      title: product.title,
      description: product.description,
      basePrice: product.basePrice,
      bidStartPrice: product.bidStartPrice,
      bidEndDate: product.bidEndDate,
      verifyRequest: product.verifyRequest,
      isPublished: product.isPublished,
      isSoldout: product.isSoldout,
      totalBids: product.totalBids || 0,
      commission: product.commission,
      image: product.images && product.images.length > 0 ? product.images[0].filePath : '',
      category: product.category,
      createdAt: product.createdAt,
      status: getProductStatus(product)
    }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = getFormattedProducts(filteredProducts.slice(startIndex, startIndex + itemsPerPage));

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Title level={5} className="font-normal">Product Lists</Title>
          <NavLink to="/dashboard/create-product">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Products</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="sold">Sold</option>
            <option value="unsold">Unsold</option>
          </select>
        </div>

        <Table 
          products={paginatedProducts} 
          delProduct={handleDeleteProduct} 
          handleSellProduct={handleSellProduct}
          startIndex={startIndex}
          getStatus={getProductStatus}
        />

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page ? 'bg-green text-white' : 'bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
