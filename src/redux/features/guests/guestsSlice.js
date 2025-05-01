import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchGuests = createAsyncThunk("guests/fetchGuests", async () => {
  const response = await fetch("/data/guests.json");
  const data = await response.json();
  // Simula una demora de 200ms
  await new Promise((resolve) => setTimeout(resolve, 200));
  return data;
});

export const fetchGuestById = createAsyncThunk(
  "guests/fetchGuestById",
  async (id) => {
    const response = await fetch("/data/guests.json");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data.find((g) => g.id === id);
  }
);

export const createGuest = createAsyncThunk(
  "guests/createGuest",
  async (newGuest) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newGuest;
  }
);

export const updateGuest = createAsyncThunk(
  "guests/updateGuest",
  async (updatedGuest) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedGuest;
  }
);

export const deleteGuest = createAsyncThunk(
  "guests/deleteGuest",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

// Slice
const guestsSlice = createSlice({
  name: "guests",
  initialState: {
    guests: [],
    guest: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH ONE
      .addCase(fetchGuestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestById.fulfilled, (state, action) => {
        state.loading = false;
        state.guest = action.payload;
      })
      .addCase(fetchGuestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.guests.push(action.payload);
      })
      .addCase(createGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.guests.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) state.guests[index] = action.payload;
      })
      .addCase(updateGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = state.guests.filter((g) => g.id !== action.payload);
      })
      .addCase(deleteGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default guestsSlice.reducer;
