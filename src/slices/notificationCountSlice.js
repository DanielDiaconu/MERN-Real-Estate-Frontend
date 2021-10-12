import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const notificationCountSlice = createSlice({
  name: "notificationCount",
  initialState,
  reducers: {
    setCount: (state, { payload }) => {
      state.count = payload;
    },
    incrementCount: (state, { payload }) => {
      state.count += 1;
    },
  },
});

export const { setCount, incrementCount } = notificationCountSlice.actions;
export const selectCount = (state) => state.notificationCountReducer.count;

export default notificationCountSlice.reducer;
