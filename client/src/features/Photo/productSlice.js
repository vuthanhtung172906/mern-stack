const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { default: productApi } = require("../../api/productApi");
export const fetchProduct = createAsyncThunk(
  "product/getAll",
  async (params, thunkApi) => {
    const allProduct = await productApi.getAll(params);
    return allProduct;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProduct: {},
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.loading = true;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.allProduct = action.payload;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
