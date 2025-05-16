import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Concierge } from "../../../type/Concierge";

interface ConciergesState {
  concierges: Concierge[];
  concierge: Concierge | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConciergesState = {
  concierges: [],
  concierge: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchConcierges = createAsyncThunk<Concierge[]>(
  "concierges/fetchConcierges",
  async () => {
    const response = await fetch("/data/concierge.json");
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 200));
    return data;
  }
);

export const fetchConciergeById = createAsyncThunk<
  Concierge | undefined,
  string
>("concierges/fetchConciergeById", async (id) => {
  const response = await fetch("/data/concierge.json");
  const data: Concierge[] = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return data.find((c) => c.id === id);
});

export const createConcierge = createAsyncThunk<Concierge, Concierge>(
  "concierges/createConcierge",
  async (newConcierge) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newConcierge;
  }
);

export const updateConcierge = createAsyncThunk<Concierge, Concierge>(
  "concierges/updateConcierge",
  async (updatedConcierge) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return updatedConcierge;
  }
);

export const deleteConcierge = createAsyncThunk<string, string>(
  "concierges/deleteConcierge",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

// Slice
const conciergesSlice = createSlice({
  name: "concierges",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchConcierges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConcierges.fulfilled,
        (state, action: PayloadAction<Concierge[]>) => {
          state.loading = false;
          state.concierges = action.payload;
        }
      )
      .addCase(fetchConcierges.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al cargar los trabajadores";
      })

      // FETCH ONE
      .addCase(fetchConciergeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConciergeById.fulfilled,
        (state, action: PayloadAction<Concierge | null>) => {
          state.loading = false;
          state.concierge = action.payload;
        }
      )
      .addCase(fetchConciergeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar el trabajador";
      })

      // CREATE
      .addCase(createConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createConcierge.fulfilled,
        (state, action: PayloadAction<Concierge>) => {
          state.loading = false;
          state.concierges.push(action.payload);
        }
      )
      .addCase(createConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear el trabajador";
      })

      // UPDATE
      .addCase(updateConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateConcierge.fulfilled,
        (state, action: PayloadAction<Concierge>) => {
          state.loading = false;
          const index = state.concierges.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) state.concierges[index] = action.payload;
        }
      )
      .addCase(updateConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al actualizar el trabajador";
      })

      // DELETE
      .addCase(deleteConcierge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteConcierge.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.concierges = state.concierges.filter(
            (c) => c.id !== action.payload
          );
        }
      )
      .addCase(deleteConcierge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar el trabajador";
      });
  },
});

export default conciergesSlice.reducer;
