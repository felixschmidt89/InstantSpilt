import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import emojiConstants from "../../../constants/emojiConstants";
import { commaToDotDecimalSeparator } from "../../../utils/formatUtils";

import styles from "./UpdatePayment.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UpdatePayment = ({
  groupMembers,
  groupCode,
  paymentDetails,
  itemId,
  route = "/instant-split",
}) => {
  const inputField = useRef(null);
  const navigate = useNavigate();
  const paymentId = paymentDetails._id;

  const [paymentAmount, setPaymentAmount] = useState(
    paymentDetails.paymentAmount
  );
  const [userName, setUserName] = useState(
    paymentDetails.paymentMaker.userName
  );
  const [paymentRecipientName, setPaymentRecipientName] = useState(
    paymentDetails.paymentRecipient.userName
  );
  const [error, setError] = useState("");
  const [formChanged, setFormChanged] = useState(false); // State to track form changes

  // useEffect to handle form changes
  useEffect(() => {
    const isFormChanged =
      paymentAmount !== paymentDetails.paymentAmount ||
      userName !== paymentDetails.paymentMaker.userName ||
      paymentRecipientName !== paymentDetails.paymentRecipient.userName;

    setFormChanged(isFormChanged);
  }, [paymentAmount, userName, paymentRecipientName, paymentDetails]);

  // On form submission: post payment and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/payments/${paymentId}`, {
        userName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      navigate(route);
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
    setPaymentAmount(commaToDotDecimalSeparator(e.target.value));
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
          inputMode='decimal'
          pattern='[0-9]+([,.][0-9]{1,2})?'
          title='Only digits, ".", and "," are allowed. Maximum value is 9999.99.'
          ref={inputField}
        />
      </div>
      <select
        className={styles.select}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required>
        <option value='' disabled>
          by
        </option>
        {groupMembers.groupMembers.map((member) => (
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
        <option value='' disabled>
          to
        </option>
        {groupMembers.groupMembers.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </select>

      <div className={styles.buttonContainer}>
        {formChanged && paymentAmount && userName && paymentRecipientName && (
          <button className={styles.button} type='submit'>
            update
          </button>
        )}
        {error && <div className={styles.errorText}>{error}</div>}{" "}
      </div>
    </form>
  );
};

export default UpdatePayment;
