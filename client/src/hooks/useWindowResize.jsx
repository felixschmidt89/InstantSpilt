// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

/**
 * tracks the window size and refreshes App component when the window is resized.
 * @returns {Object} An object containing the width and height of the window.
 */
const useAppRefreshOnBrowserResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.location.reload();
      devLog("App refreshed");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useAppRefreshOnBrowserResize;
