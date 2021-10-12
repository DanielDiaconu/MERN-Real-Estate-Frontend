import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import counterReducer from "../features/counter/counterSlice";
import toastReducer from "../slices/toastSlice";
import notificationCountReducer from "../slices/notificationCountSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    toast: toastReducer,
    notificationCountReducer: notificationCountReducer,
  },
});
