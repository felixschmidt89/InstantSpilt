// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import { setRouteInLocalStorage } from "../../../../utils/localStorageUtils";

// Styles
import styles from "./ValidateGroupCode.module.css";

const ValidateGroupCode = () => {
  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
    navigate(`/groupCode-validator/${toBeValidatedGroupCode}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder='groupCode'
          value={toBeValidatedGroupCode}
          onChange={(e) => setToBeValidatedGroupCode(e.target.value)}
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
    </div>
  );
};

export default ValidateGroupCode;
