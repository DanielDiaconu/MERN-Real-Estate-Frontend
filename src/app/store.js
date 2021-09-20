import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import counterReducer from "../features/counter/counterSlice";
import toastReducer from "../slices/toastSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    toast: toastReducer,
  },
});
