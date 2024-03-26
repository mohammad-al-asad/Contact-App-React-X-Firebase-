import { doc, deleteDoc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import useDisCloser from "../hooks/useDisCloser";
import PopUp from "./PopUp";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { name, email, id } = contact;

  const { isOpen, shouldClose, shouldOpen } = useDisCloser();

  const delContact = async (id) => {
    const contactDoc = doc(db, "contacts", id);
    toast.success("Contact deleted successfuly")
    deleteDoc(contactDoc);
  };

  return (
    <>
      <div className="bg-yellow rounded-lg flex items-center h-[64px] justify-between p-2">
        <HiOutlineUserCircle className="text-5xl text-[#F6820C]" />
        <div className="w-[184px] flex flex-col gap-2">
          <h2 className="size-3 font-semibold">{name}</h2>
          <p className="text-sm">{email}</p>
        </div>
        <div className="flex text-4xl">
          <RiEditCircleLine onClick={shouldOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => delContact(id)}
            className="cursor-pointer text-purple"
          />
        </div>
      </div>

    <PopUp isUpdate={true} isOpen={isOpen} shouldClose={shouldClose} contact={contact}/>
    </>
  );
};

export default ContactCard;
