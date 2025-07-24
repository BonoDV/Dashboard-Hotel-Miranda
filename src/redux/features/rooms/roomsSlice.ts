/// <reference types="vite/client" />
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../../type/Room";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
    const response = await axios.get<Room[]>(`${API_URL}/rooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const fetchRoomById = createAsyncThunk<Room | undefined, number>(
  "rooms/fetchRoomById",
  async (id) => {
    const response = await axios.get<Room>(`${API_URL}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const createRoom = createAsyncThunk<Room, Room>(
  "rooms/createRoom",
  async (newRoom) => {
    const response = await axios.post<Room>(
      "http://localhost:3000/rooms",
      newRoom,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const updateRoom = createAsyncThunk<Room, Room>(
  "rooms/updateRoom",
  async (updatedRoom) => {
    const response = await axios.put<Room>(
      `http://localhost:3000/rooms/${updatedRoom.roomNumber}`,
      updatedRoom,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const deleteRoom = createAsyncThunk<number, number>(
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
        const index = state.rooms.findIndex(
          (r) => r.roomNumber === action.payload.roomNumber
        );
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
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.rooms = state.rooms.filter(
          (r) => r.roomNumber !== Number(action.payload)
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar la habitación";
      });
  },
});

export default roomsSlice.reducer;
