import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  follow,
  getFollowers,
  getFollowing,
} from "../../lib/api/call/following";

export const getFollowersAsync = createAsyncThunk(
  "following/getFollowersAsync",
  async () => {
    try {
      const res = await getFollowers();
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFollowingAsync = createAsyncThunk(
  "following/getFollowingAsync",
  async () => {
    try {
      const res = await getFollowing();
      return res.data.data;
    } catch (error) {}
  }
);

export const createFollowAsync = createAsyncThunk(
  "follow/createFollowAsync",
  async (followingId: number, { rejectWithValue }) => {
    try {
      const res = await follow(followingId);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
