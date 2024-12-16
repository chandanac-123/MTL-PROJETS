import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    filter_value: "all",
    data: [],
    searchValue: "",
    refresh: false,
    address_district: "",
    fi_type: "",
    productValue: "",
    vendorValue: "",
    is_edit: true,
    districts: [],
    products: [],
    vendors: [],
  },
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerificationFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setVerificationFilter } = verificationSlice.actions;
export const selectFilter = (state) => state.verification.state;

export default verificationSlice.reducer;
