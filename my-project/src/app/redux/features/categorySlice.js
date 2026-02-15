import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../services/categoryServices";
import { toast } from "react-toastify";

const initialState = {
    categorys: [],
    category: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// ✅ Create Category
export const createCategory = createAsyncThunk("category/create", async (formData, thunkAPI) => {
    try {
        return await categoryService.createCategory(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to create category !!");
    }
});

// ✅ Get all categories
export const getAllCategories = createAsyncThunk("category/getAll", async (_, thunkAPI) => {
    try {
        return await categoryService.getAllCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// ✅ Delete Category
export const deleteCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
    try {
        return await categoryService.deleteCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

// ✅ Update Category
export const updateCategory = createAsyncThunk("category/update", async ({ id, formData }, thunkAPI) => {
    try {
        return await categoryService.updateCategory(id, formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);





const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categorys.push(action.payload);  // ✅ Store new category
                toast.success("Category created successfully!");
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to Create Category !!";
                toast.error(action.payload);
            })

            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categorys = action.payload;  // ✅ Store fetched categories
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch categories !!";
            })

            // ✅ Delete category
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categorys = state.categorys.filter(
                    (cat) => cat._id !== action.meta.arg
                ); // ✅ Remove deleted category from state
                toast.success("Category deleted successfully!");
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to delete category!";
                toast.error(state.message);
            })
             // ✅ Update category
             .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // ✅ Update category in state
                state.categorys = state.categorys.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                );
                toast.success("Category updated successfully!");
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update category!";
                toast.error(state.message);
            });

    },
});

export default categorySlice.reducer;
