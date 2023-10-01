import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import styles from "./CreatePaymentPage.module.css";
import emojiConstants from "../../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreatePaymentPage() {
  const navigate = useNavigate();

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
      navigate("/instant-split");
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
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h2 className={styles.h2}>Add payment {emojiConstants.payment}</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='number'
          value={paymentAmount}
          onChange={handlePaymentAmountChange}
          placeholder='amount'
          required
          step='0.01'
          min='0.01'
        />
        <span> </span>
        <select
          className={styles.select}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required>
          <option value='' disabled>
            by
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <span> {emojiConstants.paymentsMade} </span>
        <select
          className={styles.select}
          value={paymentRecipientName}
          onChange={(e) => setPaymentRecipientName(e.target.value)}
          required>
          <option value='' disabled>
            to
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        {userName.length >= 3 && (
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
