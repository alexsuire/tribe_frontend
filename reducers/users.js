import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, lastname: null, userId: null, firstname: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.lastname= action.payload.lastname;
      state.value.userId = action.payload.userId; 
      state.value.firstname = action.payload.firstname;
      state.value.age = action.payload.age;
      state.value.password = action.payload.password;
      state.value.level = action.payload.level;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.userId = null;
      state.value.firstname = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;