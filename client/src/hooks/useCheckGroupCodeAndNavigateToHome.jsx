import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useCheckGroupCodeAndNavigateToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");
    if (!groupCode) {
      navigate("/");
    }
  }, [navigate]);

  return null;
}

export default useCheckGroupCodeAndNavigateToHome;
