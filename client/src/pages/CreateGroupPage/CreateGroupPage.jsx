import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";

import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import styles from "./CreateGroupPage.module.css";

const CreateGroupPage = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [groupName, setGroupName] = useState("");

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // On form submission: store provided group name in database, get related groupCode in exchange, store groupCode in the client's localStorage and navigate to next page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      const { groupCode } = res.data.data.group;
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      setGroupName("");
      navigate("/create-users-signup");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating group:", error);
      }
    }
  };

  // controlled component to set groupName state
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // render back button to abort and input field, conditionally render submit button
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Create group' />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <h2>Create a group</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder='group name'
          required
          minLength={1}
          maxLength={50}
          pattern='.*\S+.*'
          ref={inputRef}
          autoFocus
        />
        {groupName.length >= 1 && (
          <div className={styles.buttonContainer}>
            <button className={styles.button} type='submit'>
              +
            </button>
          </div>
        )}
      </form>
      <PiratePx COUNT_IDENTIFIER={"create-group"} />
    </main>
  );
};

export default CreateGroupPage;
