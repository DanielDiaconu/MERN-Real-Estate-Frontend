import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
  "/notificationCount/getNotifications",
  async (data) => {
    let res = await axios.get(`http://localhost:8080/notifications/${data}`);
    return res.data;
  }
);

// export const updateNotifications = createAsyncThunk(
//   "/notificationCount/updateNotifications",
//   async (data) => {
//     await axios.patch(`http://localhost:8080/notifications/${data}`);
//   }
// );

const initialState = {
  count: 0,
  notifications: [],
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
  extraReducers: {
    [getNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload.results;
      state.count = payload.total;
    },
  },
});

export const { setCount, incrementCount } = notificationCountSlice.actions;
export const selectCount = (state) => state.notificationCountReducer.count;
export const selectNotifications = (state) =>
  state.notificationCountReducer.notifications;

export default notificationCountSlice.reducer;
