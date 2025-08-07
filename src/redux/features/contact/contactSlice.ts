/// <reference types="vite/client" />
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "../../../type/Contact";

const API_URL = import.meta.env.VITE_API_URL;

interface ContactsState {
  contacts: Contact[];
  contact: Contact | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get<Contact[]>(
      `http://localhost:3000/contacts`,
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

export const fetchContactById = createAsyncThunk<Contact, string>(
  "contacts/fetchContactById",
  async (id) => {
    const response = await axios.get<Contact>(`${API_URL}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  }
);

export const fetchContactNonActioned = createAsyncThunk<Contact[]>(
  "contacts/fetchContactNonActioned",
  async () => {
    const response = await axios.get<Contact[]>(
      `http://localhost:3000/contacts/status/non-actioned`,
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

export const createContact = createAsyncThunk<Contact, Contact>(
  "contacts/createContact",
  async (newContact) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return newContact;
  }
);

export const updateContact = createAsyncThunk<Contact, Contact>(
  "contacts/updateContact",
  async (updatedContact) => {
    const response = await axios.put<Contact>(
      `http://localhost:3000/contacts/${updatedContact.id}`,
      updatedContact,
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

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return id;
  }
);

interface LoginPayload {
  email: string;
  password: string;
}

export const loginContact = createAsyncThunk<Contact, LoginPayload>(
  "contacts/loginContact",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Login failed");
      }
      const data: Contact = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Slice
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.contacts = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al cargar los trabajadores";
      })

      // FETCH NON ACTIONED

      .addCase(fetchContactNonActioned.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContactNonActioned.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.contacts = action.payload;
        }
      )
      .addCase(fetchContactNonActioned.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al cargar los trabajadores";
      })

      // FETCH ONE
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContactById.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.contact = action.payload;
        }
      )
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al cargar el trabajador";
      })

      // CREATE
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.contacts.push(action.payload);
        }
      )
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al crear el trabajador";
      })

      // UPDATE
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.loading = false;
          const index = state.contacts.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) state.contacts[index] = action.payload;
        }
      )
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Error al actualizar el trabajador";
      })

      // DELETE
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.contacts = state.contacts.filter(
            (c) => c.id !== action.payload
          );
        }
      )
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al eliminar el trabajador";
      });
  },
});

export default contactsSlice.reducer;
