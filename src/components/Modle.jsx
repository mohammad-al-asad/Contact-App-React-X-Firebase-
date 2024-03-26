import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

function Modle({ isOpen, shouldClose, children}) {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div
            // onClick={shouldClose}
            className="backdrop-blur top-0 z-40 absolute h-screen w-screen flex"
          >
            <div className="w-[30%] bg-white z-50 gap-3 p-5 m-auto items-center">
              <div className="flex justify-end mb-4  text-2xl">
                <AiOutlineClose onClick={shouldClose} className="text-black" />
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("modle-root")
  );
}

export default Modle;
