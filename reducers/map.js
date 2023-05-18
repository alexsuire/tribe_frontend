// countSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coordinates: null
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    firstCoordinates: (state, action) => {
        state.coordinates = action.payload;
    }
  },
});

export const { firstCoordinates } = mapSlice.actions;
export default mapSlice.reducer;