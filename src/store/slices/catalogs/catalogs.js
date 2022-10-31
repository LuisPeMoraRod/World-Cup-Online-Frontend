import { createSlice } from "@reduxjs/toolkit";

/**
 * Create slice for catalogs reducer
 */
const catalogsSlice = createSlice({
  name: "catalogs",
  initialState: {
    nationalTeams: [],
    teams: [],
    types: [],
  },
  reducers: {
    setNationalTeams(state, action) {
      state.nationalTeams = action.payload;
    },
    setTeams(state, action) {
      state.teams = action.payload;
    },
    setTypes(state, action) {
      state.types = action.payload;
    },
  },
});

export const catalogsActions = catalogsSlice.actions; //action that triggers catalogs reducer functions

export default catalogsSlice.reducer;
