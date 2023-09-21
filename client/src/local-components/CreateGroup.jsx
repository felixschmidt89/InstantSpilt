import React from "react";
import { useState } from "react";
import axios from "axios";
import storeGroupCodeInLocalStorage from "../helpers/storeGroupCodeInLocalStorageHelper";

/**
 * Form to create a new group, stores the groupCode in user's local storage upon submission.
 */
export default function CreateGroup() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [groupName, setGroupName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      const { groupCode } = res.data.group;
      storeGroupCodeInLocalStorage(groupCode);
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
    <div>
      <h2>Create a group </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder='group name'
          required
          minLength='3'
          pattern='.*\S+.*'
          style={{ marginLeft: "10px" }}
        />
        {groupName.length >= 3 && (
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            next
          </button>
        )}
      </form>
    </div>
  );
}
