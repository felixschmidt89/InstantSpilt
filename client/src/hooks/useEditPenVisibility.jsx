// hooks/useEditPenVisibility.js
import { useState, useEffect } from "react";

const useEditPenVisibility = (ref, setValue) => {
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleIconClick = () => {
    setShowEdit(true);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    setShowEdit(false);
  };

  return {
    showEdit,
    handleIconClick,
    handleChange,
  };
};

export default useEditPenVisibility;
