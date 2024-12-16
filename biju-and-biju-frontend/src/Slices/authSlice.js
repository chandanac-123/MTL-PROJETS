import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      isAuth: false,
      access: "",
      refresh: "",
      username: "",
      user_type: "",
      key: "",
      is_reason: false,
      permissions: [],
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.access = action.payload.access_token;
      state.refresh = action.payload.refresh_token;
      state.username = action.payload.username;
      state.user_type = action.payload.user_type;
      state.permissions = action.payload.menu_list;
      state.key = action.payload.decryption_key;
      let is_reason = false
      if(action.payload.is_first_login == false){
        is_reason = true
        state.is_reason = true
      }
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuth: true,
          access: action.payload.access_token,
          refresh: action.payload.refresh_token,
          username: action.payload.username,
          user_type: action.payload.user_type,
          permissions: action.payload.menu_list,
          key: action.payload.decryption_key,
          is_reason: is_reason
        })
      );
    },
    logOutSuccess: (state, action) => {
      state.isAuth = false;
      state.access = "";
      state.refresh = "";
      state.username = "";
      state.user_type = "";
      state.key = "";
      state.is_reason = false
      state.permissions = [];
      localStorage.removeItem("auth");
    },
    logoutReason: (state, action) => {
      state = {...state}
      // state.isAuth = true;
      // state.access = state.access;
      // state.refresh = state.refresh;
      // state.username = state.username;
      // state.user_type = state.user_type;
      // state.permissions = state.permissions;
      // state.key = state.key;
      state.is_reason = false
      localStorage.setItem(
        "auth",
        JSON.stringify(state)
      );
    },
  },
});

export const { loginSuccess, logOutSuccess, logoutReason } = authSlice.actions;
export const selectUserName = (state) => state.auth.username;
export const selectAccess = (state) => state.auth.access;
export const selectRefresh = (state) => state.auth.refresh;
export const selectIsReason = (state) => state.auth.is_reason;

export default authSlice.reducer;