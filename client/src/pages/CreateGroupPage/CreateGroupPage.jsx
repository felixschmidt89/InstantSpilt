import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import styles from "./CreateGroupPage.module.css";

/**
 * Creates a new group & stores the related groupCode in user's local storage upon submission.
 */
export default function CreateGroupPage() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      // Retrieve groupCode from response, data.data redundancy due to axios responding res.data and API built adhering to status, data and message API convention
      const { groupCode } = res.data.data.group;
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      setGroupName("");
      navigate("/create-users-signup");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating group:", error);
      }
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <main>
      <NavigateButton
        route={"homepage"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h2>Create a group </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder='group name'
          required
          minLength={3}
          maxLength={50}
          pattern='.*\S+.*'
        />
        {groupName.length >= 3 && (
          <button
            className={styles.button}
            type='submit'
            style={{ marginLeft: "10px", padding: "2px" }}>
            +
          </button>
        )}
      </form>
    </main>
  );
}
