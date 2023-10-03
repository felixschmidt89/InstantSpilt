import React, { useEffect } from "react";
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

  return <main></main>;
};

export default IndexNavigator;
