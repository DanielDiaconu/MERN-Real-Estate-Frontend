import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import toastReducer from "../slices/toastSlice";
import notificationCountReducer from "../slices/notificationCountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    notificationCountReducer: notificationCountReducer,
  },
});
