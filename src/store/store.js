import { configureStore } from "@reduxjs/toolkit";
import catalogsReducer from "./slices/catalogs/catalogs";

const reducer = {
  catalogs: catalogsReducer,
  //   user: userReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
