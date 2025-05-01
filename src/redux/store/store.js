import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./../features/guests/guestsSlice";

const store = configureStore({
  reducer: {
    guest: guestsReducer, // Aquí pasamos el reducer correctamente
  },
});

export default store;
