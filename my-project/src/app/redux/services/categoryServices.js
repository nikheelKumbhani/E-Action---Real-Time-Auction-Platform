import { axiosPrivate, axiosPublic } from "./axios";
import { BACKEND_URL } from "../../utils/url";

export const CATEGORY_URL = `${BACKEND_URL}/category`;

const createCategory = async (formData) => {
    try {
        const response = await axiosPrivate.post(CATEGORY_URL, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to create category !!";
    }
};


const getAllCategories = async () => {
    try {
        const response = await axiosPublic.get(CATEGORY_URL);
        return response.data;  // Returns the list of categories
    } catch (error) {
        throw error.response?.data || "Failed to fetch categories !!";
    }
};

// ✅ Delete a category
const deleteCategory = async (id) => {
    try {
        const response = await axiosPrivate.delete(`${CATEGORY_URL}/${id}`);
        return response.data;  // ✅ Return success message
    } catch (error) {
        throw error.response?.data || "Failed to delete category !!";
    }
};

// ✅ Update a category
const updateCategory = async (id, formData) => {
    try {
        const response = await axiosPrivate.put(`${CATEGORY_URL}/${id}`, formData);
        return response.data;  // ✅ Return updated category
    } catch (error) {
        throw error.response?.data || "Failed to update category !!";
    }
};




const categoryService = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
};

export default categoryService;
