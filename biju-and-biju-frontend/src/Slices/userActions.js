import { createSlice } from '@reduxjs/toolkit';

const userActionsSlice = createSlice({
  name: 'userActions',
  initialState: null,
  reducers: {
    setUserAction: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserAction } = userActionsSlice.actions;
export default userActionsSlice.reducer;
