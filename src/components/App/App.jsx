import { useEffect } from "react";
import styles from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import Loader from "../Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchContacts,
} from "../../redux/contactsOps";
import {
  selectContactsError,
  selectContactsLoading,
} from "../../redux/contactsSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectContactsLoading);
  const error = useAppSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && !error && <Loader />}
      {error && <b>{error}</b>}
      <ContactList />
    </div>
  );
}
