import { createSlice } from "@reduxjs/toolkit";

/**
 * Create slice for tournaments reducer
 */
const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState: {
    tournaments: [],
    amount: 0,
  },
  reducers: {
    setTournaments(state, action) {
      state.tournaments = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const tournamentsActions = tournamentsSlice.actions; //action that triggers tournaments reducer functions

export default tournamentsSlice.reducer;
