import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { ContactsState, Contact } from "./types/contacts";
import { RootState } from "./store";
import { SerializedError } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";

const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

// Обработка pending экшенов
const handlePending = (state: ContactsState) => {
  state.loading = true;
};

// Универсальная обработка rejected экшенов с правильной типизацией
const handleRejected = (
  state: ContactsState,
  action: PayloadAction<SerializedError | undefined>
) => {
  state.loading = false;
  state.error = action.payload?.message || "Unknown error";
};

// Создание слайса
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(
        fetchContacts.fulfilled,
        (state: ContactsState, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, handleRejected) // Используем стандартный обработчик ошибок
      .addCase(addContact.pending, handlePending)
      .addCase(
        addContact.fulfilled,
        (state: ContactsState, action: PayloadAction<Contact>) => {
          state.loading = false;
          state.error = null;
          state.items.push(action.payload);
        }
      )
      .addCase(addContact.rejected, handleRejected) // Используем стандартный обработчик ошибок
      .addCase(deleteContact.pending, handlePending)
      .addCase(
        deleteContact.fulfilled,
        (state: ContactsState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = null;
          state.items = state.items.filter(
            (contact) => contact.id !== action.payload
          );
        }
      )
      .addCase(deleteContact.rejected, handleRejected); // Используем стандартный обработчик ошибок
  },
});

// Селекторы для состояния
export const selectContacts = (state: RootState) => state.contacts.items;
export const selectContactsLoading = (state: RootState) => state.contacts.loading;
export const selectContactsError = (state: RootState) => state.contacts.error;

// Мемоизированный селектор для фильтрованных контактов
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, contactName) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(contactName.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;




// import {
//   createSlice,
//   PayloadAction,
//   SerializedError,
//   createSelector,
// } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { selectNameFilter } from "./filtersSlice";

// // Инициализация состояния
// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // Обработка pending
// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// // Обработка rejected
// const handleRejected = (
//   state: ContactsState,
//   action: PayloadAction<SerializedError | undefined>
// ) => {
//   state.loading = false;
//   state.error = action.payload?.message || "Unknown error";
// };

// // Создание слайса контактов
// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending)
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload;
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected)
//       .addCase(addContact.pending, handlePending)
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload);
//         }
//       )
//       .addCase(addContact.rejected, handleRejected)
//       .addCase(deleteContact.pending, handlePending)
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected);
//   },
// });

// // Селекторы для состояния
// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) =>
//   state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;

// // Мемоизированный селектор для фильтрованных контактов
// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;

// ++++++++++++++++++++++++++++++++

// import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
// import { fetchContacts, addContact, deleteContact } from "./contactsOps";
// import { ContactsState, Contact } from "./types/contacts";
// import { RootState } from "./store";
// import { SerializedError } from '@reduxjs/toolkit';
// import { selectNameFilter } from "./filtersSlice";

// const initialState: ContactsState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// const handlePending = (state: ContactsState) => {
//   state.loading = true;
// };

// const handleRejected = (
//   state: ContactsState,
//   action: PayloadAction<SerializedError | undefined>
// ) => {
//   state.loading = false;
//   state.error = action.payload?.message || "Unknown error";
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.pending, handlePending)
//       .addCase(
//         fetchContacts.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact[]>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = action.payload;
//         }
//       )
//       .addCase(fetchContacts.rejected, handleRejected)
//       .addCase(addContact.pending, handlePending)
//       .addCase(
//         addContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items.push(action.payload);
//         }
//       )
//       .addCase(addContact.rejected, handleRejected)
//       .addCase(deleteContact.pending, handlePending)
//       .addCase(
//         deleteContact.fulfilled,
//         (state: ContactsState, action: PayloadAction<Contact>) => {
//           state.loading = false;
//           state.error = null;
//           state.items = state.items.filter(
//             (contact) => contact.id !== action.payload.id
//           );
//         }
//       )
//       .addCase(deleteContact.rejected, handleRejected);
//   },
// });

// export const selectContacts = (state: RootState) => state.contacts.items;
// export const selectContactsLoading = (state: RootState) => state.contacts.loading;
// export const selectContactsError = (state: RootState) => state.contacts.error;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, contactName) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(contactName.toLowerCase())
//     );
//   }
// );

// export default contactsSlice.reducer;
