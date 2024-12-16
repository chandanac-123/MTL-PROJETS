import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("common")
  ? JSON.parse(localStorage.getItem("common"))
  : {
      isCollapse: false,
    };

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    collapseSuccess: (state, action) => {
      state.isCollapse = action.payload;
      localStorage.setItem(
        "common",
        JSON.stringify({
          isCollapse: action.payload,
        })
      );
    },
  },
});

export const { collapseSuccess } = commonSlice.actions;
export const selectIsCollapse = (state) => state.common.isCollapse;

export default commonSlice.reducer;
