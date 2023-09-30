import React, { useEffect, useState } from "react";
import axios from "axios";
import emojiConstants from "../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupExpenses({ groupCode }) {
  const [groupExpensesAndPayments, setGroupExpensesAndPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    async function fetchGroupExpensesAndPayments() {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/expenses-and-payments`
        );
        const responseData = response.data.data;
        console.log(responseData);
        if (
          responseData.groupExpensesAndPayments &&
          responseData.groupExpensesAndPayments.length > 0
        ) {
          setGroupExpensesAndPayments(responseData.groupExpensesAndPayments);
        }
        setError(null);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching group expenses and payments:", error);
        }
        setError(
          "An error occurred while fetching group expenses and payments. Please try again later."
        );
      }
    }

    fetchGroupExpensesAndPayments();
  }, [groupCode]);

  return (
    <div>
      <h2>Expenses and payments</h2>
      <ul>
        {groupExpensesAndPayments.map((item) => (
          <li key={item._id}>
            {item.expenseName ? (
              <>
                <strong>
                  {emojiConstants.expense} {item.expenseName}
                </strong>
                : <span>{item.expenseAmount.toFixed(2)}€</span>{" "}
                {emojiConstants.paidFor}{" "}
                <strong>{item.expensePayer.userName}</strong>
                <br />({new Date(item.updatedAt).toLocaleString()})
              </>
            ) : (
              <>
                <span>
                  {emojiConstants.payment} {item.paymentAmount.toFixed(2)}€
                </span>{" "}
                <strong>
                  {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
                  {item.paymentRecipient.userName}
                </strong>
                <br />({new Date(item.updatedAt).toLocaleString()})
              </>
            )}
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}
