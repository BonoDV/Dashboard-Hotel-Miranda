import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../../type/Room";

interface RoomState {
  rooms: Room[];
  room: Room | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  room: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchRooms = createAsyncThunk<Room[]>(
  "rooms/fetchRooms",
  async () => {
    const response = await fetch("/data/rooms.json");
    const data: Room[] = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data;
  }
);

export const fetchRoomById = createAsyncThunk<Room | undefined, string>(
  "rooms/fetchRoomById",
  async (id) => {
    const response = await fetch("/data/rooms.json");
    const data: Room[] = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data.find((r) => r.roomNumber.toString() === id);
  }
);

export const createRoom = createAsyncThunk<Room, Room>(
  "rooms/createRoom",
  async (newRoom) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newRoom;
  }
);

export const updateRoom = createAsyncThunk<Room, Room>(
  "rooms/updateRoom",
  async (updatedRoom) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedRoom;
  }
);

export const deleteRoom = createAsyncThunk<string, string>(
  "rooms/deleteRoom",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

// Slice
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al cargar las habitaciones";
      })

      // FETCH ONE
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.room = null;
      })
      .addCase(
        fetchRoomById.fulfilled,
        (state, action: PayloadAction<Room | undefined>) => {
          state.loading = false;
          state.room = action.payload ?? null;
        }
      )
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar la habitación";
      })

      // CREATE
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear la habitación";
      })

      // UPDATE
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false;
        const index = state.rooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.rooms[index] = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al actualizar la habitación";
      })

      // DELETE
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar la habitación";
      });
  },
});

export default roomsSlice.reducer;
