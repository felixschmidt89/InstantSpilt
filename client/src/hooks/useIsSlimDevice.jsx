import { useState, useEffect } from "react";

/**
 * Determines if the device is small (maximum width of 600px).
 * @returns {boolean} True if the device is small, otherwise false.
 */
const useIsSlimDevice = () => {
  const [isSlimDevice, setIsSlimDevice] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSlimDevice(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSlimDevice;
};

export default useIsSlimDevice;
