import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { SET_LOGIN } from "../slice/auth";

export const loginAsync = createAsyncThunk(
   "auth/login",
   async (body: { username: string; password: string }, thunkAPI) => {
      try {
         const res = await loginApi(body);

         const token = res.data.token;
         localStorage.setItem("token", token);

         thunkAPI.dispatch(SET_LOGIN({ user: res.data.data, token }));

         return token;
      } catch (error) {
         const err = error as unknown as Error;
         console.log(err);

         thunkAPI.rejectWithValue(err.message);
      }
   }
);

export const getProfileAsync = createAsyncThunk(
   "auth/getProfile",
   async (token: string) => {
      try {
         console.log(token);

         const { data } = await getProfile(token);
         console.log("DATA GET TOKEN", data.data);

         return data.data;
      } catch (error) {
         console.log(error);
      }
   }
);