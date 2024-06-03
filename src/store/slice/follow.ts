import { createSlice } from "@reduxjs/toolkit";
import { IFollow } from "../../types/app";
import {
  getFollowersAsync,
  getFollowingAsync,
} from "../async/follow";

interface InitialState {
  followers: IFollow[];
  following: IFollow[];
}

const initialState: InitialState = {
  followers: [],
  following: [],
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFollowersAsync.fulfilled, (state, action) => {
      state.followers = action.payload;
    });

    builder.addCase(getFollowingAsync.fulfilled, (state, action) => {
      state.following = action.payload;
    });
  },
});

export default followSlice.reducer;
