import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Guest } from "../../../type/Guest";
import axios from "axios";

// Estado inicial tipado
interface GuestsState {
  guests: Guest[];
  guest: Guest | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuestsState = {
  guests: [],
  guest: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchGuests = createAsyncThunk<Guest[]>(
  "guests/fetchGuests",
  async () => {
    const response = await axios.get<Guest[]>("http://localhost:3000/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const fetchGuestById = createAsyncThunk<Guest | undefined, string>(
  "guests/fetchGuestById",
  async (id) => {
    const response = await axios.get<Guest>(
      `http://localhost:3000/booking/${id}`,
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

export const createGuest = createAsyncThunk<Guest, Guest>(
  "guests/createGuest",
  async (newGuest) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newGuest;
  }
);

export const updateGuest = createAsyncThunk<Guest, Guest>(
  "guests/updateGuest",
  async (updatedGuest) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedGuest;
  }
);

export const deleteGuest = createAsyncThunk<string, string>(
  "guests/deleteGuest",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

// Slice
const guestsSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGuests.fulfilled,
        (state, action: PayloadAction<Guest[]>) => {
          state.loading = false;
          state.guests = action.payload;
        }
      )
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar los huéspedes";
      })

      // FETCH ONE
      .addCase(fetchGuestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGuestById.fulfilled,
        (state, action: PayloadAction<Guest | undefined>) => {
          state.loading = false;
          state.guest = action.payload ?? null;
        }
      )
      .addCase(fetchGuestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar el huésped";
      })

      // CREATE
      .addCase(createGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGuest.fulfilled, (state, action: PayloadAction<Guest>) => {
        state.loading = false;
        state.guests.push(action.payload);
      })
      .addCase(createGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear el huésped";
      })

      // UPDATE
      .addCase(updateGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGuest.fulfilled, (state, action: PayloadAction<Guest>) => {
        state.loading = false;
        const index = state.guests.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) state.guests[index] = action.payload;
      })
      .addCase(updateGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al actualizar el huésped";
      })

      // DELETE
      .addCase(deleteGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteGuest.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.guests = state.guests.filter((g) => g.id !== action.payload);
        }
      )
      .addCase(deleteGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar el huésped";
      });
  },
});

export default guestsSlice.reducer;
