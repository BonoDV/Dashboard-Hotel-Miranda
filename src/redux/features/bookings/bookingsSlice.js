import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    booking: null,
  },
});
