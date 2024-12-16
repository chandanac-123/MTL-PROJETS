import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
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
    productValue: "",
    vendorValue: "",
  },
};

const reportReceivedSlice = createSlice({
  name: "reportReceived",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = reportReceivedSlice.actions;
export const selectFilter = (state) => state.reportReceived.state;

export default reportReceivedSlice.reducer;
