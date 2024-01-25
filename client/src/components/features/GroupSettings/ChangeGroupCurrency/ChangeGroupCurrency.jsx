// React and Third-Party Libraries
import React, { useRef, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

// Contents
import { currenciesContent } from "../../../../contents/currenciesContent";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./ChangeGroupCurrency.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * ChangeGroupCurrency component for updating group currency.
 *
 * @param {Object} props - Component props.
 * @param {string} props.groupCode - the groupCode identifying the group.
 * @param {string} props.groupCurrency - The current currency of the group.
 * @returns {JSX.Element} React component.
 */
const ChangeGroupCurrency = ({ groupCode, groupCurrency }) => {
  const selectRef = useRef(null);
  const navigate = useNavigate();
  const storedGroupCurrency = groupCurrency;
  const [newGroupCurrency, setNewGroupCurrency] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.patch(
        `${apiUrl}/groups/currency/${groupCode}`,
        {
          groupCode,
          currency: newGroupCurrency,
        }
      );
      devLog("Group currency updated:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setError(error.response.data.errors[0].message);
        } else {
          setError(genericErrorMessage);
          devLog("Error updating group currency:", error);
        }
      }
    }
  };

  const handleSelectChange = (e) => {
    setNewGroupCurrency(e.target.value);
  };

  // Remove class after click, so that select does not fall back to appearing inactive
  const handleSelectFocus = () => {
    selectRef.current.classList.remove(styles.idleOnMount);
  };

  // Find the label for storedGroupCurrency
  const storedCurrencyLabel = currenciesContent.find(
    (currency) => currency.value === storedGroupCurrency
  )?.label;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Change group currency</h2>
      <form onSubmit={handleFormSubmit}>
        <select
          className={`${styles.select} ${styles.idleOnMount}`}
          value={newGroupCurrency}
          ref={selectRef}
          onFocus={handleSelectFocus}
          onChange={handleSelectChange}>
          {/* Default option */}
          <option className={styles.storedCurrency} value='' disabled>
            {storedCurrencyLabel}
          </option>
          {/* Render options from currenciesContent excluding storedGroupCurrency */}
          {currenciesContent
            .filter((currency) => currency.value !== storedGroupCurrency)
            .map((currency) => (
              <option
                key={currency.value}
                className={styles.newCurrency}
                value={currency.value}>
                {currency.label}
              </option>
            ))}
        </select>
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.3}
          translateY={0.1}
        />
      </form>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default ChangeGroupCurrency;
