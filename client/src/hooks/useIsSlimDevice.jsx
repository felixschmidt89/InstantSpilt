import { useState, useEffect } from "react";

/**
 * Determines if the device is slim (maximum width of 500px) or very slim (maximum width of 400px).
 * @returns {Object} An object containing information about the device's slimness.
 */
const useIsSlimDevice = () => {
  const [isSlimDevice, setIsSlimDevice] = useState(window.innerWidth <= 500);
  const [isVerySlimDevice, setIsVerySlimDevice] = useState(
    window.innerWidth <= 400
  );

  useEffect(() => {
    const handleResize = () => {
      const isSlim = window.innerWidth <= 500;
      const isVerySlim = window.innerWidth <= 400;
      setIsSlimDevice(isSlim);
      setIsVerySlimDevice(isVerySlim);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSlimDevice, isVerySlimDevice };
};

export default useIsSlimDevice;
