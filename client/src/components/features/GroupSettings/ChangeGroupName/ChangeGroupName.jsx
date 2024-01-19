// React and Third-Party Libraries
import React, { useRef, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./ChangeGroupName.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangeGroupName = ({ groupCode, groupName }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const storedGroupName = groupName;
  const [newGroupName, setNewGroupName] = useState(storedGroupName);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.patch(`${apiUrl}/groups/${groupCode}`, {
        groupCode,
        groupName: newGroupName,
      });
      devLog("Groupname updated:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setError(error.response.data.errors[0].message);
        } else {
          setError(genericErrorMessage);
          devLog("Error updating group name:", error);
        }
      }
    }
  };

  // Add active class on click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    inputRef.current.classList.add(styles.active);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Change group name</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount}`}
          type='text'
          value={newGroupName}
          onClick={handleInputClick}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder={storedGroupName}
          ref={inputRef}
        />
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.3}
          translateY={0.1}
        />
      </form>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default ChangeGroupName;
