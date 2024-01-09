import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  update:false
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    updateFollowingList:(state)=>{
        state.update= !state.update;
    }
  },
});
export const { updateFollowingList } = friendSlice.actions

export default friendSlice.reducer;