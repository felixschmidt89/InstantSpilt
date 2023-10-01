import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteResourceButton.module.css";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const DeleteResourceButton = ({ resourceId, resourceType, route }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Retrieve singular resourceType for button text
  const buttonText = resourceType.slice(0, -1);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        navigate(route || "/instant-split");
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        setError(`An error occurred while deleting the ${resourceType}.`);
      }
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={handleDelete}>
        Delete {buttonText}
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default DeleteResourceButton;
