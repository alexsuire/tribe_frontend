import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: null, token: null, lastname: null, firstname: null, age: null, password: null, level: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
      state.value.lastname= action.payload.lastname;
      state.value.firstname = action.payload.firstname;
      state.value.age = action.payload.age;
      state.value.password = action.payload.password;
      state.value.level = action.payload.level;
    },
    logout: (state) => {
      state.value.email = null;
      state.value.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;