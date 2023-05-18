// countSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coordinates: null,
    searchCoordinates: null,
    firstSpot: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
      setFirstSpot: (state, action) => {
        state.firstSpot = action.payload;
      },
     
  },
});

export const { setCoordinates, setSearchCoordinates, setFirstSpot, resetCoordinates} = mapSlice.actions;
export default mapSlice.reducer;