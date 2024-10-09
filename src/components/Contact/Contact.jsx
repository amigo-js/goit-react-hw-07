import { IoPersonOutline, IoPhonePortraitOutline } from "react-icons/io5";
import styles from "./Contact.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact }) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={styles.contactContainer}>
      <ul className={styles.contactList}>
        <li className={styles.contactItem}>
          <IoPersonOutline />
          {contact.name}
        </li>
        <li className={styles.contactItem}>
          <IoPhonePortraitOutline />
          {contact.number}
        </li>
      </ul>
      <button className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
