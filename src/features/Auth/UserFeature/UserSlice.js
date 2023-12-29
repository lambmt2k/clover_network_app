import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../../apis/User";
import { Platform } from "react-native";


const initialState = {
  loading: false,
  userInfo: null,
};
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token) => {
    try {
      const req = await UserApi.getUserInfoApi(token);
      const res = await req.data;
      
      return res;
    } catch (error) {
      
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getUserInfo.pending,(state)=>{
        state.loading=true
    })
    .addCase(getUserInfo.fulfilled,(state,actions)=>{
      
        state.loading=false;
        state.userInfo = actions.payload.data
    })
    .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        console.log(err)
      });
  },
});

export default userSlice.reducer;