import { createSlice } from '@reduxjs/toolkit';

const roomsSlice = createSlice({
  name: 'rooms',
    initialState: {
        rooms: [],
        room: null,
    },
})