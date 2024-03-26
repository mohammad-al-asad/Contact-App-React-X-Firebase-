import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modle from "./Modle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as yup from "yup"

function PopUp({ isOpen, shouldClose, isUpdate, contact }) {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  

  const addContact = async (value) => {
    const contactRef = collection(db, "contacts");
    shouldClose();
    toast.success("Contact added successfuly")

    await addDoc(contactRef, value);
  };

  const updateContact = async (id, value) => {
    const contactDoc = doc(db, "contacts", id);
    shouldClose();
    toast.success("Contact updated successfuly")

    await updateDoc(contactDoc, value);
  };

  return (
    <>
      <Modle isOpen={isOpen} shouldClose={shouldClose}>
        <Formik
        validationSchema={validationSchema}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(value) => {
            isUpdate ? updateContact(contact.id, value) : addContact(value);
          }}
        >
          <Form>
            <div className="flex flex-col">
              <label htmlFor="name" className="p-1">
                Name
              </label>
              <Field name="name" className="border border-black p-2" />
              <div className="text-red text-sm">
              <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="p-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="border border-black p-2"
              />
              <div className="text-red text-sm">
              <ErrorMessage name="email"/>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button className="bg-[#F6820C] self-end p-2 ">
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </div>
          </Form>
        </Formik>
      </Modle>
    </>
  );
}

export default PopUp;
