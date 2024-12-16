import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    data: [],
    searchValue: "",
    refresh: false,
    fi_type: "",
    productValue: "",
    vendorValue: "",
    is_edit: true,
    districts: [],
    products: [],
    vendors: [],
    address_district: "",
  },
};

const reportSubmittedSlice = createSlice({
  name: "reportSubmitted",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = reportSubmittedSlice.actions;
export const selectFilter = (state) => state.reportSubmitted.state;

export default reportSubmittedSlice.reducer;
