import { useState } from "react";

export const useToggle = () => {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => setShow(!show);

  return {
    show,
    toggle,
  };
};
