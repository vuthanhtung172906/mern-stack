import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/userApi";
const initialState = {
  isLogged: false,
  user: {},
  isAdmin: false,
  loading: "idle",
};
export const getInforUserThunk = createAsyncThunk(
  "auth/getuser",
  async (token) => {
    try {
      const inforUser = await UserApi.getUser(token);
      return inforUser;
    } catch (error) {
      throw error;
    }
  }
);
export const addToCartThunk = createAsyncThunk("auth/addcart", async (arg) => {
  try {
    const check = arg.cart.every((state) => {
      return state._id !== arg.product._id;
    });
    if (check) {
      const newCart = [...arg.cart, { ...arg.product, quantity: 1 }];
      const newCart2 = await UserApi.addCart(newCart, arg.token);
      return newCart2;
    } else {
      alert("Product has been in cart");
      return arg.cart;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
const userSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    loggin: (state, action) => {
      return {
        ...state,
        isLogged: action.payload,
      };
    },
    addCart2: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          cart: action.payload,
        },
      };
    },
  },
  extraReducers: {
    [getInforUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [getInforUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAdmin = action.payload.role === 1 ? true : false;
    },
    [addToCartThunk.pending]: (state) => {
      state.loading = true;
    },
    [addToCartThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        cart: action.payload,
      };
    },
  },
});

const { reducer, actions } = userSlice;
export const { loggin, addCart2 } = actions;
export default reducer;
