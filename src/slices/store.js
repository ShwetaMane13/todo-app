"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});
