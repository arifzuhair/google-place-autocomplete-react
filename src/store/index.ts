import { configureStore } from "@reduxjs/toolkit";
import AutocompleteReducers from "./features/autocomplete/autocompleteSlice";

const store = configureStore({
  reducer: {
    autocomplete: AutocompleteReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
