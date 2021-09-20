import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast as toastLibrary } from "react-toastify";

const initialState = {
  show: true,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setErrorToast: (state, { payload }) => {
      toastLibrary.error(payload);
    },
    setSuccessToast: (state, { payload }) => {
      toastLibrary.success(payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { setErrorToast, setSuccessToast } = toastSlice.actions;

export default toastSlice.reducer;
