import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/productServices";
import { toast } from "react-toastify";


const initialState = {
  products: [],
  userproducts: [],
  wonedproduct: [],
  product: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""

}
// Create new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData) => {
    try {
      const response = await productService.createProduct(formData);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) || error.message || "Failed to create product";
      throw new Error(message);
    }
  }
);


// Get all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProductsOfUser = createAsyncThunk("product/get-user-products", async (_, thunkAPI) => {
  try {
    return await productService.getAllProductsOfUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const getAllWonedProductsOfUser = createAsyncThunk("product/get-user-woned-products", async (_, thunkAPI) => {
  try {

    const data =  await productService.getAllWonedProductsOfUser();
    // console.log(data);
    
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


// Delete a product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get a product
export const getProduct = createAsyncThunk(
  "products/get",
  async (id) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      throw new Error(message);
    }
  }
);


// Update product - Fix the parameter structure
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product by admin
export const updateProductByAdmin = createAsyncThunk(
  "product/admin/updateByAdmin",
  async ({ id, formData }) => {
    try {
      return await productService.updateProductByAdmin(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      throw new Error(message);
    }
  }
);

const sellProduct = createAsyncThunk(
  "product/sell",
  async (id, thunkAPI) => {
    try {
      return await productService.sellProduct(id);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to sell product";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PRODUCT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
     // Create a product
     .addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.products.push(action.payload);
      state.message = "Product created successfully";
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
      })

      .addCase(getAllProductsOfUser.pending, (state) => {
         state.isLoading = true;
       })
      .addCase(getAllProductsOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userproducts = action.payload;
      })
      .addCase(getAllProductsOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Fetch Products !!";
        toast.error(state.message)
      })

      .addCase(getAllWonedProductsOfUser.pending, (state) => {
         state.isLoading = true;
       })
      .addCase(getAllWonedProductsOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wonedproduct = action.payload;
      })
      .addCase(getAllWonedProductsOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Fetch Products !!";
        toast.error(state.message);
      })

      // Get a product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;  // Changed from {} to null
        toast.error("Failed to fetch product details");
      })
     
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        // Update in products array if exists
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.message = "Product updated successfully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update product by admin
      .addCase(updateProductByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        // Update in products array if exists
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.message = "Product updated successfully by admin";
      })
      .addCase(updateProductByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete a product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.message = "Product deleted successfully";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sellProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = state.products.map(product => 
          product._id === action.payload.data._id ? action.payload.data : product
        );
        toast.success("Product sold successfully!");
      })
      .addCase(sellProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PRODUCT } = productSlice.actions;
export const selectProduct = (state) => state.product.product;
export const selectAllProducts = (state) => state.product.products; // Add this selector

export default productSlice.reducer;

export { sellProduct };
