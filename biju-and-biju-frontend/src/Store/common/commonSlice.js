import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  httpinstance,
  httpinstancefile,
  httpinstanceRate,
} from "../../axios/api";

export const get_data = createAsyncThunk("get_data", async (url) => {
  try {
    const response = await httpinstance.get(url);
    return response;
  } catch (err) {
    return err.response;
  }
});

export const getDataWithParams = createAsyncThunk(
  "get_data",
  async ({ url, params }) => {
    try {
      const response = await httpinstance.get(url, {
        params,
      });
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const post_data = createAsyncThunk(
  "post_data",
  async ({ url, values }) => {
    try {
      const response = await httpinstance.post(url, values);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const patch_data = createAsyncThunk(
  "patch_data",
  async ({ url, values }) => {
    try {
      const response = await httpinstance.patch(url, values);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const put_data = createAsyncThunk(
  "put_data",
  async ({ url, values }) => {
    try {
      const response = await httpinstance.put(url, values);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const post_data_file = createAsyncThunk(
  "post_data_file",
  async ({ url, values }) => {
    try {
      const response = await httpinstancefile.post(url, values);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const patch_data_file = createAsyncThunk(
  "patch_data_file",
  async ({ url, values }) => {
    try {
      const response = await httpinstancefile.patch(url, values);
      return response;
    } catch (err) {
      return err.response;
    }
  }
);

export const delete_data = createAsyncThunk("delete_data", async (url) => {
  try {
    const response = await httpinstance.delete(url);
    return response;
  } catch (err) {
    return err.response;
  }
});

const initialState = {
  data: {},
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
});
export default commonSlice.reducer;
