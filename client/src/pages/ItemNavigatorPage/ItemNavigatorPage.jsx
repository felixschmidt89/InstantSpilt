import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ItemNavigatorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");

    // Check the itemType and navigate accordingly
    if (itemType === "expense") {
      // Navigate to the expense component route
      navigate(`/expense-page/${itemId}`);
    } else if (itemType === "payment") {
      // Navigate to the payment component route
      navigate(`/payment-page/${itemId}`);
    } else {
      // Handle other itemTypes or no itemType
      navigate("/not-found");
    }
  }, [location, navigate]);

  return <main></main>;
};

export default ItemNavigatorPage;
