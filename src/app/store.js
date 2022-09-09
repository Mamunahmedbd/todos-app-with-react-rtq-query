import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "../features/api/apiSlice";
import filterSlice from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [todosApi.reducerPath]: todosApi.reducer,
    filter: filterSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
