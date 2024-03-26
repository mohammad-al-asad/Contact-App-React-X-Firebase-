import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound.jsx";
import PopUp from "./components/PopUp.jsx";
import { db } from "./config/firebase.js";
import useDisCloser from "./hooks/useDisCloser.js";

export default function App() {
  const [contacts, setContacts] =   useState([]);
  const { isOpen, shouldClose, shouldOpen } = useDisCloser();

  const filterContact = (e) => {
    const value = e.target.value;
    try {
      const getContacts = async () => {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactslist = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          const filterContacts = contactslist.filter((contact) => {
            return contact.name.toLowerCase().includes(value.toLowerCase());
          });

          setContacts(filterContacts);
        });
      };
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const getContacts = async () => {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactslist = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactslist);
        });
      };
      getContacts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="bg-[#323334] m-auto w-[350px] h-[650px] p-6 space-y-4 rounded-md">
        <Nav />
        <div className="pt-2">
          <div className="flex relative flex-grow items-center gap-2">
            <FaSearch className="absolute size-5 text-center ml-3 text-white" />
            <input
              onChange={filterContact}
              type="text"
              className="h-10 flex-grow bg-transparent border-white border rounded-md text-white pl-10 outline-none"
            />
            <FaPlusCircle
              onClick={shouldOpen}
              className="size-10 text-white cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-col gap-2 flex pt-2 ">
          {contacts.length === 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <PopUp shouldClose={shouldClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}
