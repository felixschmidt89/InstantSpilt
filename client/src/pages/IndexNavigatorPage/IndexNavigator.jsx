import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const IndexNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    if (groupCode) {
      navigate("/instant-split");
    } else {
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <main>
      <Helmet>
        <title>InstantSplit - Navigator</title>
      </Helmet>
    </main>
  );
};

export default IndexNavigator;
