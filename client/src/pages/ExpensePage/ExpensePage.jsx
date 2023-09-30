import React from "react";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const ExpensePage = () => {
  const { itemId } = useParams();
  console.log(itemId);
  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Expense Details</h1>
    </main>
  );
};

export default ExpensePage;
