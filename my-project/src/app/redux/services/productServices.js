import axios from "axios";
import { axiosPrivate } from "./axios";
import { BACKEND_URL } from "../../utils/url";

export const PRODUCT_URL = `${BACKEND_URL}/product`;

// Helper function to get auth token
const getAuthConfig = () => {
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const token = userStr ? JSON.parse(userStr).token : null;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const createProduct = async (productData) => {
  try {
    console.log("=== PRODUCT SERVICE: Creating product ===");
    console.log("PRODUCT_URL:", PRODUCT_URL);

    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const token = userStr ? JSON.parse(userStr).token : null;

    console.log("Token exists:", !!token);
    console.log("FormData entries:");
    for (let pair of productData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    console.log("Making POST request to:", PRODUCT_URL);
    const response = await axios.post(PRODUCT_URL, productData, config);
    console.log("Response received:", response);
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("=== PRODUCT SERVICE ERROR ===");
    console.error("Error:", error);
    console.error("Error response:", error.response);
    console.error("Error message:", error.message);
    console.error("Error response data:", error.response?.data);
    throw error;
  }
};

const getAllProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}/`);
  return response.data;
};

const getAllProductsOfUser = async () => {
  const config = getAuthConfig();
  const response = await axios.get(`${PRODUCT_URL}/user`, config);
  return response.data;
};

const getAllWonedProductsOfUser = async () => {
  const config = getAuthConfig();
  const response = await axios.get(`${PRODUCT_URL}/won-products`, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const config = getAuthConfig();
  const response = await axios.delete(`${PRODUCT_URL}/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${id}`);
    if (!response.data) {
      throw new Error('Product not found');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product details');
  }
};

const updateProduct = async (id, formData) => {
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const token = userStr ? JSON.parse(userStr).token : null;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };
  const response = await axios.put(`${PRODUCT_URL}/${id}`, formData, config);
  return response.data;
};

const updateProductByAdmin = async (id, formData) => {
  const response = await axiosPrivate.patch(`${PRODUCT_URL}/admin/product-verified/${id}`, formData);
  return response.data;
};

const sellProduct = async (id) => {
  const response = await axios.patch(`${PRODUCT_URL}/sell/${id}`);
  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  getAllProductsOfUser,
  getAllWonedProductsOfUser,
  deleteProduct,
  getProduct,
  updateProduct,
  updateProductByAdmin,
  sellProduct,
};
export default productService;
