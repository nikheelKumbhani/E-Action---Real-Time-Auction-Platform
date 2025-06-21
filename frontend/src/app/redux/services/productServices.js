import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const PRODUCT_URL = `${BACKEND_URL}/product`;

const createProduct = async (productData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await axios.post(PRODUCT_URL, productData, config);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}/`);
  return response.data;
};

const getAllProductsOfUser = async () => {
  const response = await axios.get(`${PRODUCT_URL}/user`);
  return response.data;
};

const getAllWonedProductsOfUser = async () => {
  const response = await axios.get(`${PRODUCT_URL}/won-products`);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}/${id}`);
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
  // console.log("fee");

      // Debugging FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  const config = { headers: { "Content-Type": "multipart/form-data" } };  
  const response = await axios.put(`${PRODUCT_URL}/${id}`, formData, config);
  return response.data;
};

const updateProductByAdmin = async (id, formData) => {
  const response = await axios.patch(`${PRODUCT_URL}/admin/product-verified/${id}`, formData);           // ------------------<----------
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
