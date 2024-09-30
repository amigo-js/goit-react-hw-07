import React from "react";
import { FC } from "react";
import Contact from "../Contact/Contact";
import { Contact as ContactType } from "../../redux/types/contacts"; // Импортируем тип Contact

interface ContactListProps {
  contacts: ContactType[]; // Массив контактов
  onDelete: (id: string) => void; // Функция для удаления контакта
}

const ContactList: FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ContactList;

// import { FC } from "react";
// import Contact from "../Contact/Contact";
// import { useAppSelector } from "../../redux/hooks";
// import { selectFilteredContacts } from "../../redux/contactsSlice";
// import styles from "./ContactList.module.css";

// interface ContactListProps {
//   onDelete: (id: string) => void;
// }

// const ContactList: FC<ContactListProps> = ({ onDelete }) => {
//   const contacts = useAppSelector(selectFilteredContacts);

//   return (
//     <div className={styles.contactList}>
//       {contacts.map((contact) => (
//         <Contact key={contact.id} contact={contact} onDelete={onDelete} />
//       ))}
//     </div>
//   );
// };

// export default ContactList;

// import { FC } from "react";
// import Contact from "../Contact/Contact";
// import { useAppSelector } from "../../redux/hooks";
// import { selectFilteredContacts } from "../../redux/contactsSlice";
// import styles from "./ContactList.module.css";

// const ContactList: FC = () => {
//   const contacts = useAppSelector(selectFilteredContacts);

//   return (
//     <div className={styles.contactList}>
//       {contacts.map((contact) => (
//         <Contact key={contact.id} contact={contact} />
//       ))}
//     </div>
//   );
// };

// export default ContactList;
