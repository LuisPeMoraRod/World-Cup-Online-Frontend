import { configureStore } from "@reduxjs/toolkit";
import catalogsReducer from "./slices/catalogs/catalogs";
import tournamentsReducer from "./slices/tournaments/tournaments";
import userReducer from "./slices/user/userSlice";

const reducer = {
  catalogs: catalogsReducer,
  tournaments: tournamentsReducer,
  user: userReducer,
};  

const store = configureStore({
  reducer: reducer,
  devTools: true,
});


export default store;
