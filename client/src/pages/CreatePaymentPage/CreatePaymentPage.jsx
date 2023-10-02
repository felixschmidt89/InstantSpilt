// DONE adding only meaningful necessary comments

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import styles from "./CreatePaymentPage.module.css";
import emojiConstants from "../../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreatePaymentPage() {
  const navigate = useNavigate();
  const inputField = useRef(null);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [paymentRecipientName, setPaymentRecipientName] = useState("");
  const groupCode = localStorage.getItem("activeGroupCode");
  const groupMembers = useFetchGroupMembers(groupCode);

  // Autofocus the input field on mount
  useEffect(() => {
    inputField.current.focus();
  }, []);

  // On form submission: post payment and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/payments`, {
        userName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      navigate("/instant-split");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
      }
    }
  };

  // controlled component to set paymentAmount state
  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  // render back button to abort and input fields, conditionally render submit button
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
          ref={inputField}
        />
        <select
          className={styles.select}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required>
          {/* Do not preselect user, indicate functionality instead */}
          <option value='' disabled>
            by
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <span className={styles.paymentToEmoji}>
          {emojiConstants.paymentsMade}
        </span>
        <select
          className={styles.select}
          value={paymentRecipientName}
          onChange={(e) => setPaymentRecipientName(e.target.value)}
          required>
          {/* Do not preselect user, indicate functionality instead */}
          <option value='' disabled>
            to
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        {/* Conditionally render submit button when payment amount, payment maker and recipient is given*/}
        <div className={styles.buttonContainer}>
          {paymentAmount && userName && paymentRecipientName && (
            <button className={styles.button} type='submit'>
              +
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
