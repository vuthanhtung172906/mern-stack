import UserApi from "../api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAccessTokenThunk = createAsyncThunk(
  "token/getToken",
  async (params, thunkApi) => {
    const token = await UserApi.getAccessToken();
    return token.accessToken;
  }
);
const tokenSlice = createSlice({
  initialState: {
    accesstoken: "",
    loading: "idle",
  },
  name: "token",
  extraReducers: (builder) => {
    builder.addCase(getAccessTokenThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.accesstoken = action.payload;
    });
    builder.addCase(getAccessTokenThunk.pending, (state, action) => {
      state.loading = true;
    });
  },
});
export default tokenSlice.reducer;
