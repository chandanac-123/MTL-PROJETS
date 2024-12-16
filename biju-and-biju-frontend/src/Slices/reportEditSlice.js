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
    is_edit: true,
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

const reportEditSlice = createSlice({
  name: "reportEdit",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = reportEditSlice.actions;
export const selectFilter = (state) => state.reportEdit.state;

export default reportEditSlice.reducer;
