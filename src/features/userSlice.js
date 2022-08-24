import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      if(action.payload.title=='')state.user.title='Master of Universe'
      if(action.payload.avatar=='')state.user.avatar='../img/default_avatar.jpg'
    },

    logout: (state) => {
      state.user = null;
    },

  },
});

export const { login, logout } = userSlice.actions;

//Selector
export const selectUser = (state) => state.user.user; 

export default userSlice.reducer;
