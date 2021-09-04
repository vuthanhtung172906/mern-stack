import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

const snackbarSlice = createSlice({
  initialState: initialState,
  name: "snackbar",
  reducers: {
    setSnackbar: (state, action) => {
      const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
      return {
        ...state,
        snackbarMessage,
        snackbarOpen,
        snackbarType,
      };
    },
  },
});

const { reducer, actions } = snackbarSlice;
export const { setSnackbar } = actions;
export default reducer;
