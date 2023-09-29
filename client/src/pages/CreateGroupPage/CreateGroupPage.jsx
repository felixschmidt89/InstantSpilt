import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";

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
      navigate("/create-users");
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
      <h2>Create a group </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder='group name'
          required
          minLength={3}
          maxLength={50}
          pattern='.*\S+.*'
          style={{ marginLeft: "10px" }}
        />
        {groupName.length >= 3 && (
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            next
          </button>
        )}
      </form>
    </main>
  );
}
