import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/api/apiSlice";
import counterReducer from "../features/counter/counterSlice";
import shoppingCartReducer from "../features/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shoppingCart: shoppingCartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
