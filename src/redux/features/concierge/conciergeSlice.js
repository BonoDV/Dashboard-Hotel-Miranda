import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchConcierges = createAsyncThunk(
  "concierges/fetchConcierges",
  async () => {
    const response = await fetch("/data/concierge.json");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data;
  }
);

export const fetchConciergeById = createAsyncThunk(
  "concierges/fetchConciergeById",
  async (id) => {
    const response = await fetch("/data/concierge.json");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data.find((c) => c.id === id);
  }
);

export const createConcierge = createAsyncThunk(
  "concierges/createConcierge",
  async (newConcierge) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newConcierge;
  }
);

export const updateConcierge = createAsyncThunk(
  "concierges/updateConcierge",
  async (updatedConcierge) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedConcierge;
  }
);

export const deleteConcierge = createAsyncThunk(
  "concierges/deleteConcierge",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

// Slice
const conciergesSlice = createSlice({
  name: "concierges",
  initialState: {
    concierges: [],
    concierge: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchConcierges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConcierges.fulfilled, (state, action) => {
        state.loading = false;
        state.concierges = action.payload;
      })
      .addCase(fetchConcierges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH ONE
      .addCase(fetchConciergeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConciergeById.fulfilled, (state, action) => {
        state.loading = false;
        state.concierge = action.payload;
      })
      .addCase(fetchConciergeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConcierge.fulfilled, (state, action) => {
        state.loading = false;
        state.concierges.push(action.payload);
      })
      .addCase(createConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConcierge.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.concierges.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) state.concierges[index] = action.payload;
      })
      .addCase(updateConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConcierge.fulfilled, (state, action) => {
        state.loading = false;
        state.concierges = state.concierges.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default conciergesSlice.reducer;
