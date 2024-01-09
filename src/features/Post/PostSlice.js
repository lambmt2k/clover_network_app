import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  update:false,
  postId:null,
  liked:true
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost:(state,action)=>{
        state.postId= action.payload;
        state.liked = action.payload
    }
  },
});
export const { updatePost } = postSlice.actions

export default postSlice.reducer;