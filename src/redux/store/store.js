import { configureStore } from "@reduxjs/toolkit";
import guestsReducer from "./../features/guests/guestsSlice";
import roomsReducer from "./../features/rooms/roomsSlice";

const store = configureStore({
  reducer: {
    guest: guestsReducer, // Aquí pasamos el reducer correctamente
    room: roomsReducer, // Aquí pasamos el reducer correctamente
  },
});

export default store;
