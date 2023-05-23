import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : {
  sessionName: null,
  spot: null,
  date: null,
  start: null,
  end: null,
  description: null,
    }
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addSessionName: (state, action) => {
      state.value.sessionName = action.payload;
    },
    addSpot: (state, action) => {
      state.value.spot = action.payload;
    },
    addDate: (state, action) => {
        state.value.date = action.payload;
    }, 
    addStartSession: (state, action) => {
      state.value.start = action.payload;
    },
    addEndSession: (state, action) => {
        state.value.end = action.payload;
    },
    addSessionDescription: (state, action) => {
        state.value.description = action.payload;
    },

  },
});

export const { addSessionName, addSpot, addDate, addStartSession, addEndSession, addSessionDescription } = sessionSlice.actions;
export default sessionSlice.reducer;