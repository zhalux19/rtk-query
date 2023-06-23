import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../pages/services/servicesSlice";
import dogsReducer from "../pages/dogs/dogsSlice";
import { api } from "./apiSlice";
import { setupListeners } from '@reduxjs/toolkit/query';

// const devToolsEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    services: servicesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
  // enhancers: [devToolsEnhancer]
});


setupListeners(store.dispatch);