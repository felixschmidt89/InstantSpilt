// React and Third-Party Libraries
import React, { useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Contents
import { currenciesContent } from "../../../../contents/currenciesContent";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./ChangeGroupCurrency.module.css";
import { submitOnEnterClick } from "../../../../utils/formUtils";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * ChangeGroupCurrency component for updating group currency.
 *
 * @param {Object} props - Component props.
 * @param {string} props.groupCode - the groupCode identifying the group.
 * @param {string} props.groupCurrency - The current currency of the group.
 * @param {boolean} props.isOnboarding - Flag indicating whether the component is used in the onboarding process.
 * @returns {JSX.Element} React component.
 */
const ChangeGroupCurrency = ({ groupCode, groupCurrency, isOnboarding }) => {
  const selectRef = useRef(null);
  const { t } = useTranslation();
  const [labelCurrency, setLabelCurrency] = useState(groupCurrency);
  const [newGroupCurrency, setNewGroupCurrency] = useState("");
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

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
      setLabelCurrency(newGroupCurrency);
      handleUpdateFeedback();
    } catch (error) {
      setError(t("generic-error-message"));
      displayErrorModal();
      devLog("Error updating group currency:", error);
    }
  };

  const handleSelectChange = (e) => {
    setNewGroupCurrency(e.target.value);
  };

  // Remove idle class after click, so that select does not fall back to appearing inactive
  const handleSelectFocus = () => {
    selectRef.current.classList.remove(styles.idleOnMount);
  };

  // Add idle class upon update, so that select goes back to appearing inactive with updated value
  const handleUpdateFeedback = () => {
    selectRef.current.classList.add(styles.idleOnMount);
  };

  // Submit on enter button click
  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  // Find the label for labelCurrency
  const storedCurrencyLabel = currenciesContent.find(
    (currency) => currency.value === labelCurrency
  )?.label;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        {t("change-group-currency-setting-header")}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <select
          className={`${styles.select} ${styles.idleOnMount}`}
          value={newGroupCurrency}
          ref={selectRef}
          onFocus={handleSelectFocus}
          onChange={handleSelectChange}
          onKeyDown={handleKeyDown}>
          {/* Default option */}
          <option className={styles.storedCurrency}>
            {storedCurrencyLabel}
          </option>
          {/* Render options from currenciesContent excluding labelCurrency */}
          {currenciesContent
            .filter((currency) => currency.value !== labelCurrency)
            .map((currency) => (
              <option
                key={currency.value}
                className={styles.newCurrency}
                value={currency.value}>
                ({currency.value}) {currency.label}
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
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeGroupCurrency;
