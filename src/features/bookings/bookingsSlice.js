import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
    initialState: {
        rooms: [],
        room: null,
    },
})