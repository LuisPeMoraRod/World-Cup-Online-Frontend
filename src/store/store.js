import { configureStore } from "@reduxjs/toolkit";
import catalogsReducer from "./slices/catalogs/catalogs";
import tournamentsReducer from "./slices/tournaments/tournaments";

const reducer = {
  catalogs: catalogsReducer,
  tournaments: tournamentsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
