import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch("/data/rooms.json");
  const data = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return data;
});

export const fetchRoomById = createAsyncThunk(
  "rooms/fetchRoomById",
  async (id) => {
    const response = await fetch("/data/rooms.json");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data.find((r) => r.roomNumber.toString() === id);
  }
);

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (newRoom) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newRoom;
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (updatedRoom) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedRoom;
  }
);

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return id;
});

// Slice
const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    room: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH ONE
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedRoom = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.rooms[index] = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default roomsSlice.reducer;
