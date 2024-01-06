import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PiratePx from "../../components/common/PiratePx/PiratePx";

const ItemNavigatorUserHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");
    const userId = searchParams.get("userId");

    // Check the itemType and navigate accordingly
    if (itemType === "expense") {
      // Navigate to the expense component route
      navigate(`/update-user-expense/${userId}/${itemId}`);
    } else if (itemType === "payment") {
      // Navigate to the payment component route
      navigate(`/update-user-payment/${userId}/${itemId}`);
    } else {
      // Handle other itemTypes or no itemType
      navigate("/not-found");
    }
  }, [location, navigate]);

  return (
    <main>
      <PiratePx COUNT_IDENTIFIER={"user-history-item-navigator"} />
    </main>
  );
};

export default ItemNavigatorUserHistoryPage;
