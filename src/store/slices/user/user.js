import { createSlice } from "@reduxjs/toolkit";

/**
 * Create slice for tournaments reducer
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    isAdmin: false,
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setIsAdmin(state, action) {
        state.isAdmin = action.payload;
    },
  },
});

export const userActions = userSlice.actions; //action that triggers user reducer functions

export default userSlice.reducer;
