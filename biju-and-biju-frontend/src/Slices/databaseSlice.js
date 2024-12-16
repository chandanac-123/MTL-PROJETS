import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    vendor: "all",
    executives: "all",
    location: "all",
    from_date: "",
    to_date: "",
    data: [],
    date_type: "fi_date",
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

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setDataFilter } = databaseSlice.actions;
export const selectFilter = (state) => state.database.state;

export default databaseSlice.reducer;
