import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      uid: "",
      accessToken: "",
      email: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = { uid: "", accessToken: "", email: "" };
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
