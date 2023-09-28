import React, { useState } from "react";
import axios from "axios";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreatePaymentPage() {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [paymentRecipientName, setPaymentRecipientName] = useState("");
  const groupCode = localStorage.getItem("activeGroupCode");
  const groupMembers = useFetchGroupMembers(groupCode);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupCode = localStorage.getItem("activeGroupCode");
      await axios.post(`${apiUrl}/payments`, {
        userName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      setPaymentAmount("");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
      }
    }
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  return (
    <div>
      <h2>Add payment</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type='number'
          value={paymentAmount}
          onChange={handlePaymentAmountChange}
          placeholder='Enter amount'
          required
          step='0.01'
          min='0.01'
        />
        <select
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required>
          <option value='' disabled>
            By
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <select
          value={paymentRecipientName}
          onChange={(e) => setPaymentRecipientName(e.target.value)}
          required>
          <option value='' disabled>
            To
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        {userName.length >= 3 && (
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            Add
          </button>
        )}
      </form>
    </div>
  );
}
