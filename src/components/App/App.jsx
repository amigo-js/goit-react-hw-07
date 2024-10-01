import { useEffect } from "react";
import styles from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import Loader from "../Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../../redux/contactsOps";
import {
  selectFilteredContacts,
  selectContactsError,
  selectContactsLoading,
} from "../../redux/contactsSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectFilteredContacts);
  const loading = useAppSelector(selectContactsLoading);
  const error = useAppSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    const contactWithId = { ...newContact, id: Date.now().toString() };
    dispatch(addContact(contactWithId));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBox />
      {loading && !error && <Loader />}
      {error && <b>{error}</b>}
      <ContactList contacts={contacts} onDelete={handleDeleteContact} />
    </div>
  );
}
