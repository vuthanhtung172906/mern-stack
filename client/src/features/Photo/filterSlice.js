import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _limit: 12,
  _page: 1,
  _q: "",
};

const filter = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    searchFilter: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = filter;
export const { searchFilter } = actions;

export default reducer;
