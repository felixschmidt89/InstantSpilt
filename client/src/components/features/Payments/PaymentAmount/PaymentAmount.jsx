import React, { useEffect, useRef } from "react";
import { commaToDotDecimalSeparator } from "../../../../utils/formatUtils";
import styles from "./PaymentAmount.module.css";

const PaymentAmount = ({ paymentAmount, onAmountChange, setFormChanged }) => {
  const inputRef = useRef(null);

  // Autofocus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  // controlled input component to set paymentAmount state, converting comma separator to dot prior to posting
  const handlePaymentAmountChange = (e) => {
    onAmountChange(commaToDotDecimalSeparator(e.target.value));
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.amount}
        type='text'
        value={paymentAmount}
        onChange={handlePaymentAmountChange}
        placeholder='0.00'
        inputMode='decimal'
        pattern='[0-9]+([,.][0-9]{1,2})?'
        title='Only digits, ".", and "," are allowed. Maximum value is 9999.99.'
        ref={inputRef}
      />
    </div>
  );
};

export default PaymentAmount;
