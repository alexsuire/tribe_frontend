import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    token: null,
    lastname: null,
    firstname: null,
    age: 0,
    password: null,
    level: null,
    spots: [],
    country: null
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginScreen: (state, action) => {
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    loginBasicScreen: (state, action) => {
      state.value.lastname = action.payload.lastname;
      state.value.firstname = action.payload.firstname;
      state.value.age = action.payload.age;
    },
    AddFavoriteSpot: (state, action) => {
      state.value.spots.push(action.payload);
    },
    RemoveFavoriteSpot: (state, action) => {
      state.value.spots = state.value.spots.filter(
        (spot) => spot !== action.payload
      );
    },
    loginCountry: (state, action) => {
      state.value.country = action.payload
    },
    loginLevel: (state, action) => {
      state.value.level = action.payload
    },
    addToken: (state, action) => {
      state.value.token = action.payload
    },
    logout: (state) => {
      state.value.email = null;
      state.value.password = null;
    },
  },
});

export const {
  loginScreen,
  loginBasicScreen,
  AddFavoriteSpot,
  RemoveFavoriteSpot,
  logout,
  loginCountry,
  loginLevel,
  addToken
} = userSlice.actions;
export default userSlice.reducer;
