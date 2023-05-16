// countSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedCount: 0,
  selectedSpots: [],
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.checkedCount += 1;
    },
    decrementCount: (state) => {
      state.checkedCount -= 1;
    },
    selectSpot: (state, action) => {
      state.selectedSpots.push(action.payload);
    },
    deselectSpot: (state, action) => {
      state.selectedSpots = state.selectedSpots.filter((spot) => spot !== action.payload);
    },
  },
});

export const { incrementCount, decrementCount, selectSpot, deselectSpot } = countSlice.actions;
export default countSlice.reducer;
