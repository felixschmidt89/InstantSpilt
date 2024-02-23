// React and Third-Party Libraries
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { getRouteFromLocalStorage } from "../../../../utils/localStorageUtils";

// Styles
import styles from "./InAppNavigationBar.module.css";
import InstantSplitLogo from "../../InstantSplitLogo/InstantSplitLogo";

/**
 * InAppNavigationBar component for rendering navigation links within the application. Utilizes previousRoute key from local storage for nested navigation and nestedPreviousRoute for further nested navigation
 *
 * @param {Object} props - The component props.
 *
 * @param {boolean} props.back - Indicates if it's a back navigation. Defaults to false.
 * @param {string} props.backRoute - The route to navigate backward to. Defaults to "/instant-split".
 * @param {boolean} props.previousRoute - Indicates if previousRoute stored in localStorage should be applied. If so, back icon will be applied. Defaults to false.
 * @param {boolean} props.nestedPreviousRoute - Indicates if nestedPreviousRoute stored in localStorage should be applied. If so, back icon will be applied. Defaults to false.
 * @param {boolean} props.home - Indicates if it's a navigation to the main application. Defaults to false.
 * @param {string} props.homeRoute - The route to navigate to. Defaults to "/instant-split".
 * @param {boolean} props.forward - Indicates if it's a forward navigation. Defaults to false.
 * @param {string} props.forwardRoute - The route to navigate forward to. Defaults to "/instant-split".
 * @returns {React.Component} The rendered InAppNavigationBar component.
 */
const InAppNavigationBar = ({
  back = false,
  backRoute = "/instant-split",
  previousRoute = false,
  nestedPreviousRoute = false,
  home = false,
  homeRoute = "/instant-split",
  forward = false,
  forwardRoute = "/instant-split",
}) => {
  const navigate = useNavigate();

  const handleRegularNavigation = (route) => {
    devLog("Navigating to:", route);
    navigate(route);
  };

  const handleNestedNavigation = () => {
    const destinationRoute = nestedPreviousRoute
      ? getRouteFromLocalStorage("nestedPreviousRoute")
      : getRouteFromLocalStorage();

    devLog("Navigating to:", destinationRoute);

    navigate(destinationRoute, {}, (e) => {
      // Check if navigation was not prevented
      if (!e.defaultPrevented) {
        devLog("Navigating to:", destinationRoute);
      }
    });
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.leftIcon}>
        {back && (
          <div className={styles.iconContainer}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
              onClick={() => handleRegularNavigation(backRoute)}
            />
            <div className={styles.text}>back</div>
          </div>
        )}
        {previousRoute && (
          <div className={styles.iconContainer}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
              onClick={() => handleNestedNavigation(previousRoute)}
            />
            <div className={styles.text}>back</div>
          </div>
        )}
        {nestedPreviousRoute && (
          <div className={styles.iconContainer}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
              onClick={() => handleNestedNavigation(nestedPreviousRoute)}
            />
            <div className={styles.text}>back</div>
          </div>
        )}
      </div>
      <div className={styles.middleLogo}>
        <InstantSplitLogo className={styles.instantSplitLogo} width={"24"} />
      </div>
      <div className={styles.rightIcon}>
        {home && (
          <div className={styles.iconContainer}>
            <GoHome
              className={`${styles.rightAlignedIcon} ${styles.icon}`}
              onClick={() => handleRegularNavigation(homeRoute)}
            />
            <div className={styles.text}>main</div>
          </div>
        )}
        {forward && (
          <div className={styles.forwardContainer}>
            <IoArrowForwardCircleOutline
              className={`${styles.rightAlignedIcon} ${styles.icon}`}
              onClick={() => handleRegularNavigation(forwardRoute)}
            />
            <div className={styles.text}>next</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InAppNavigationBar;
