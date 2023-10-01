import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Checks if groupCode exists in localStorage and navigates to homepage if not
 */

function useCheckGroupCodePresenceAndNavigateHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");
    if (!groupCode) {
      navigate("/homepage");
    }
  }, [navigate]);

  return null;
}

export default useCheckGroupCodePresenceAndNavigateHome;
