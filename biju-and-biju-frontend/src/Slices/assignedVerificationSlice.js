import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    filter_value: "all",
    data: [],
    searchValue: "",
    is_edit: true,
    refresh: false,
    products: [],
    vendors: [],
    districts: [],
    address_district: "",
    fi_type: "",
    productValue: "",
    vendorValue: "",
  },
};

const assignedVerificationSlice = createSlice({
  name: "assignedVerification",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = assignedVerificationSlice.actions;
export const selectFilter = (state) => state.assignedVerification.state;

export default assignedVerificationSlice.reducer;
