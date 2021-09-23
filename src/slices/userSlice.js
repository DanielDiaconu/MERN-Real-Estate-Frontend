import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isEqual } from "lodash";
import { toast } from "react-toastify";
import { setErrorToast, setSuccessToast } from "./toastSlice";

const initialState = {
  user: {
    _id: null,
    wishlist: [],
    funds: 50,
  },
};

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  let res = await axios.get(`http://localhost:8080/users/${id}`);
  return res.data;
});

export const updateUserWishlist = createAsyncThunk(
  "user/updateUserWishlist",
  async ({ id, data, removed = true }) => {
    try {
      let res = await axios.patch(
        `http://localhost:8080/users/update-wishlist/${id}`,
        data
      );
      return { data: res.data, removed };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserFunds = createAsyncThunk(
  "user/updateUserFunds",
  async ({ amount, id, cardId }, { dispatch }) => {
    try {
      let response = await axios.patch(
        `http://localhost:8080/users/deposit-funds/${id}`,
        { funds: amount, cardId }
      );
      dispatch(setSuccessToast(response.data.message));
      return amount;
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { dispatch }) => {
    try {
      let res = await axios.put(`http://localhost:8080/users/${id}`, data);
      dispatch(setSuccessToast("User has been updated successfully!"));
      return res.data;
    } catch (error) {
      dispatch(setErrorToast("There has been an error!"));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    extractUserFunds: (state, { payload }) => {
      state.user.funds -= payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      if (isEqual(state.user, payload)) return;
      state.user = payload;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [updateUserWishlist.fulfilled]: (state, { payload }) => {
      state.user.wishlist = payload.data;
      toast.success(
        `Successfully ${
          payload.removed ? "removed from" : "added to"
        } your wishlist!`
      );
    },
    [updateUserWishlist.rejected]: (state, { payload }) => {
      toast.error("There was a problem proccesing your request!");
    },
    [updateUserFunds.fulfilled]: (state, { payload }) => {
      state.user.funds += payload;
    },
  },
});

export const { setUser, extractUserFunds } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
