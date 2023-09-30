import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteUser.module.css";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const DeleteUser = ({ userId }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/users/${userId}`);

      console.log(userId);

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        navigate("/instant-split");
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while deleting the user.");
      }
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={handleDeleteUser}>
        Delete User
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteUser;
