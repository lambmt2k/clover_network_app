import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../apis/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  loading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginInfo) => {
    try {
      const req = await AuthApi.loginApi(loginInfo);
      const res = await req.data;
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.user =null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.loading = false;

        if (actions.payload.messageEN === "Profile empty ") {
          state.error = actions.payload.messageEN;
        }

        if (actions.payload.messageEN === "Email or password is incorrect") {
          state.error = "Email or password is incorrect";
        }
        if (actions.payload.messageEN === "Action success") {
          state.error = "Action success";
          state.user = actions.payload.data;
          
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Please verify email!";
      });
  },
});

export const {logout} = loginSlice.actions;
export const loginError = (state) => state.login.error;

export default loginSlice.reducer;
