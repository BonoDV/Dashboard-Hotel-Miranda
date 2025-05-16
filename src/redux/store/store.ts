import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "../features/guests/guestsSlice.ts";
import roomsReducer from "../features/rooms/roomsSlice.ts";
import conciergeReducer from "../features/concierge/conciergeSlice.ts";

const store = configureStore({
  reducer: {
    guest: guestsReducer, // Aquí pasamos el reducer correctamente
    room: roomsReducer, // Aquí pasamos el reducer correctamente
    concierge: conciergeReducer, // Aquí pasamos el reducer correctamente
  },
});

export default store;
