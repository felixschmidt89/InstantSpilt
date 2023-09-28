import React, { useState } from "react";
import axios from "axios";
import useFetchGroupMembers from "../hooks/useFetchGroupMembers";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const groupCode = localStorage.getItem("activeGroupCode");
const groupMembers = useFetchGroupMembers(groupCode);

    export default function CreatePayment() {
        const [paymentAmount, setPaymentAmount] = useState("");
        const [userName, setUserName] = useState("");
        const [paymentRecipientName, setPaymentRecipientName] = useState("");
        const [groupMembers, setGroupMembers] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // provide groupCode for authentication
      const groupCode = localStorage.getItem("activeGroupCode");
      await axios.post(`${apiUrl}/payments`, {
        userName,
        groupCode,
        paymentAmount
        paymentRecipientName,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
      }
    }
  };
  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentRecipientNameChange = (e) => {
    setPaymentRecipientChange(e.target.value);
  };

  return (
    <div>
      <h2>Add expense</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type='number'
          value={paymentAmount}
          onChange={handlePaymentAmountChange}
          placeholder='Payment Amount'
          required
          step='0.01'
          min='0.01'
          style={{ marginLeft: "10px" }}
        />
        {userName.length >= 3 && (
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            add
          </button>
        )}
      </form>
    </div>
  );
}
