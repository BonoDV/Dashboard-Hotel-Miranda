import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./../features/guests/guestsSlice";
import roomsReducer from "./../features/rooms/roomsSlice";
import conciergeReducer from "./../features/concierge/conciergeSlice";

const store = configureStore({
  reducer: {
    guest: guestsReducer, // Aquí pasamos el reducer correctamente
    room: roomsReducer, // Aquí pasamos el reducer correctamente
    concierge: conciergeReducer, // Aquí pasamos el reducer correctamente
  },
});

export default store;
