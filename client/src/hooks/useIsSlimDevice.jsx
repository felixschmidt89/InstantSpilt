import { useState, useEffect } from "react";

/**
 * Determines if the device is slim (maximum width of 600px) or very slim (maximum width of 350px).
 * @returns {Object} An object containing information about the device's slimness.
 */
const useIsSlimDevice = () => {
  const [isSlimDevice, setIsSlimDevice] = useState(window.innerWidth <= 600);
  const [isVerySlimDevice, setIsVerySlimDevice] = useState(
    window.innerWidth <= 350
  );

  useEffect(() => {
    const handleResize = () => {
      const isSlim = window.innerWidth <= 600;
      const isVerySlim = window.innerWidth <= 350;
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
