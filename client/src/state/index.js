import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, removeToken } = authSlice.actions;
export default authSlice.reducer;
