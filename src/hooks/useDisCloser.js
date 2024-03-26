import { useState } from "react";

function useDisCloser() {
    const [isOpen, setIsOpen] = useState(false);

    const shouldOpen = () => {
        setIsOpen(true);
      };
      const shouldClose = () => {
        setIsOpen(false);
      };
  return {isOpen,shouldClose,shouldOpen}
}

export default useDisCloser