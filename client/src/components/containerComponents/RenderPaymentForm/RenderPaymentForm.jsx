import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RenderPaymentForm.module.css";
import commaToDotDecimalSeparatorHelperFunction from "../../../helpers/commaToDotDecimalSeparatorHelper";
import emojiConstants from "../../../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function RenderPaymentForm({ groupMembers, groupCode }) {
  const inputField = useRef(null);
  const navigate = useNavigate();

  const [paymentAmount, setPaymentAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [paymentRecipientName, setPaymentRecipientName] = useState("");
  const [error, setError] = useState("");

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
      if (error.response) {
        // Handle bad requests
        if (error.response.status === 400) {
          console.log(error.response);
          setError(error.response.data.errors[0].message);
        } else if (error.response.status === 409) {
          // Handle conflict
          setError(error.response.data.message);
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          console.error("Error creating expense:", error);
        }
      }
    }
  };

  // controlled second input component to set paymentAmount state, converting comma separator to dot prior to posting
  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(commaToDotDecimalSeparatorHelperFunction(e.target.value));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.container}>
        <input
          className={styles.inputField}
          type='text'
          value={paymentAmount}
          onChange={handlePaymentAmountChange}
          placeholder='0.00'
          pattern='[0-9]+([,.][0-9]{1,2})?'
          inputMode='decimal'
          ref={inputField}
        />
      </div>
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
      {/* Conditionally render submit button when payment amount, payment maker, and recipient is given*/}
      <div className={styles.buttonContainer}>
        {/* {paymentAmount && userName && paymentRecipientName && (
          <button className={styles.button} type='submit'>
            +
          </button>
        )} */}
        <button className={styles.button} type='submit'>
          +
        </button>
        {error && <div className={styles.errorText}>{error}</div>}{" "}
        {/* Render error message */}
      </div>
    </form>
  );
}
