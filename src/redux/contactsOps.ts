import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "./types/contacts";
import myContactList from "../components/Data/myContactList.json"; // Импорт JSON данных

axios.defaults.baseURL = "https://66f9b29cafc569e13a997d47.mockapi.io/";

export const fetchContacts = createAsyncThunk<Contact[], void>(
  "contacts/fetchAll",
  async () => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      // Используем данные из JSON файла, если сервер недоступен
      console.warn("Using local data, server unreachable.");
      return myContactList; // Локальные данные
    }
  }
);

export const addContact = createAsyncThunk<Contact, Contact>(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue("Unable to add contact.");
    }
  }
);

export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue("Unable to delete contact.");
    }
  }
);



// export const deleteContact = createAsyncThunk<string, string>(
//   "contacts/deleteContact",
//   async (contactId, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/contacts/${contactId}`);
//       return contactId;
//     } catch (error) {
//       // Удаляем контакт из локального списка, если сервер недоступен
//       const index = myContactList.findIndex(
//         (contact) => contact.id === contactId
//       );
//       if (index !== -1) {
//         myContactList.splice(index, 1); // Удаление из локальных данных
//         return contactId;
//       }
//       return rejectWithValue("Unable to delete contact locally.");
//     }
//   }
// );

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Contact } from "./types/contacts";
// import myContactList from "../components/Data/myContactList.json"; // Импорт JSON данных

// axios.defaults.baseURL = "https://66f9b29cafc569e13a997d47.mockapi.io/";

// export const fetchContacts = createAsyncThunk<Contact[], void>(
//   "contacts/fetchAll",
//   async () => {
//     // Если бэкенд недоступен, используем локальный JSON файл
//     try {
//       const response = await axios.get("/contacts");
//       return response.data;
//     } catch (error) {
//       return myContactList; // Используем данные из JSON файла
//     }
//   }
// );

// export const addContact = createAsyncThunk<Contact, Contact>(
//   "contacts/addContact",
//   async (newContact) => {
//     const response = await axios.post("/contacts", newContact);
//     return response.data;
//   }
// );

// export const deleteContact = createAsyncThunk<string, string>(
//   "contacts/deleteContact",
//   async (contactId) => {
//     await axios.delete(`/contacts/${contactId}`);
//     return contactId;
//   }
// );
