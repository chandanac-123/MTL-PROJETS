import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    vendor: "all",
    agent: "all",
    location: "all",
    from_date: "",
    to_date: "",
    data: [],
    searchValue: "",
    refresh: false,
    vendor_list: [],
    location_list: [],
    agent_list: [],
    fi_type: "",
    productValue: "",
    vendorValue: "",
    districts: [],
    products: [],
    vendors: [],
    address_district: "",
  },
};

const reportConfirmSlice = createSlice({
  name: "reportConfirm",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = reportConfirmSlice.actions;
export const selectFilter = (state) => state.reportConfirm.state;

export default reportConfirmSlice.reducer;
