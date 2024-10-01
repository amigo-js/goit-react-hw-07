import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import myContactList from "../components/Data/myContactList.json";

axios.defaults.baseURL = "https://66f9b29cafc569e13a997d47.mockapi.io/";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch {
    console.warn("Using local data, server unreachable.");
    return myContactList;
  }
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch {
      return rejectWithValue("Unable to add contact.");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch {
      return rejectWithValue("Unable to delete contact.");
    }
  }
);
