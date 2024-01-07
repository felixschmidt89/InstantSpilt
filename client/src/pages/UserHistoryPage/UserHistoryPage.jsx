import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import styles from "./UserHistoryPage.module.css";
import RenderUserExpenses from "../../components/features/RenderUserExpenses/RenderUserExpenses";
import RenderUserPayments from "../../components/features/RenderUserPayments/RenderUserPayments";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function UserHistoryPage() {
  const [userExpensesAndPayments, setUserExpensesAndPayments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rerender, setRerender] = useState(0);

  const { userId } = useParams();

  useEffect(() => {
    async function fetchUserExpensesAndPayments() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/${userId}/expenses-and-payments`
        );
        const responseData = response.data.data;

        if (
          responseData.userExpensesAndPayments &&
          responseData.userExpensesAndPayments.length > 0
        ) {
          // Create new properties and sort by createdAt in descending order
          const modifiedData = responseData.userExpensesAndPayments
            .map((item) => ({
              ...item,
              itemId: item._id,
              // Determine and add 'itemType' based on the presence of properties
              itemType: item.expenseDescription
                ? "expense"
                : item.paymentAmount
                ? "payment"
                : "unknown",
              // Convert createdAt to a Date object
              createdAt: new Date(item.createdAt),
            })) // Sort by createdAt in descending order
            .sort((a, b) => b.createdAt - a.createdAt);
          setUserExpensesAndPayments(modifiedData);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching user expenses and payments:", error);
        }
        setError(
          "An error occurred while fetching user expenses and payments. Please try again later."
        );
        setIsLoading(false); // Set loading to false when data is fetched
      }
    }

    fetchUserExpensesAndPayments();
  }, [userId, rerender]);

  // Trigger rerender
  const handleRerender = () => {
    setRerender((prevValue) => prevValue + 1);
  };

  console.log(userExpensesAndPayments);

  return isLoading ? (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h1>User history</h1>
      <div className={styles.spinner}>
        <Spinner />
      </div>
    </main>
  ) : (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - user history' />
      <PiratePx COUNT_IDENTIFIER={"user-history"} />
      <NavigateButton
        route={`user-page/${userId}`}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h1>User history</h1>
      <div className={styles.container}>
        {userExpensesAndPayments.length > 0 ? (
          <ul>
            {userExpensesAndPayments.map((item) => (
              <li className={styles.item} key={item._id}>
                {item.expenseDescription ? (
                  <RenderUserExpenses
                    item={item}
                    handleRerender={handleRerender}
                    userId={userId}
                  />
                ) : (
                  <RenderUserPayments
                    item={item}
                    handleRerender={handleRerender}
                    userId={userId}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.failMessage}>
            No associated expenses or payments.
          </p>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
}
