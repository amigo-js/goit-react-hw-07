import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <div className={styles.container}>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </div>
  );
}
