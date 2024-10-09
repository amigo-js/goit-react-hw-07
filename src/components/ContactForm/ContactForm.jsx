import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { addContact } from "../../redux/contactsOps";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number format")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const contactWithId = { ...values, id: Date.now().toString() };
    dispatch(addContact(contactWithId));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.formContainer}>
        <div className={styles.formWrap}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className={styles.formWrap}>
          <label className={styles.label} htmlFor="number">
            Number
          </label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" />
        </div>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
