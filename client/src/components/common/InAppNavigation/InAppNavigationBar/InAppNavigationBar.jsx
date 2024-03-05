// React and Third-Party Libraries
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

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
 * @param {boolean} props.forward - Indicates if it's a forward navigation. Defaults to false. If shown, logo does not navigate to the main application.
 * @param {string} props.forwardRoute - The route to navigate forward to. Defaults to "/instant-split".
 *  @param {boolean} props.logoOnly -  renders logo only without any routing. Defaults to false.

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
  logoOnly = false,
}) => {
  const { t } = useTranslation();
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
            <div className={styles.text}>
              {t("in-app-navigation-back-icon-text")}
            </div>
          </div>
        )}
        {previousRoute && (
          <div className={styles.iconContainer}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
              onClick={() => handleNestedNavigation(previousRoute)}
            />
            <div className={styles.text}>
              {t("in-app-navigation-back-icon-text")}
            </div>
          </div>
        )}
        {nestedPreviousRoute && (
          <div className={styles.iconContainer}>
            <IoArrowBackCircleOutline
              className={`${styles.leftAlignedIcon} ${styles.icon}`}
              onClick={() => handleNestedNavigation(nestedPreviousRoute)}
            />
            <div className={styles.text}>
              {t("in-app-navigation-back-icon-text")}
            </div>
          </div>
        )}
      </div>
      <div className={styles.middleLogo}>
        <InstantSplitLogo
          className={styles.instantSplitLogo}
          width={"24"}
          linkToInstantSplitPage={!logoOnly && !forward}
        />
      </div>
      <div className={styles.rightIcon}>
        {home && (
          <div className={styles.iconContainer}>
            <GoHome
              className={`${styles.rightAlignedIcon} ${styles.icon}`}
              onClick={() => handleRegularNavigation(homeRoute)}
            />
            <div className={styles.text}>
              {t("in-app-navigation-main-icon-text")}
            </div>
          </div>
        )}
        {forward && (
          <div className={styles.iconContainer}>
            <IoArrowForwardCircleOutline
              className={`${styles.rightAlignedIcon} ${styles.icon}`}
              onClick={() => handleRegularNavigation(forwardRoute)}
            />
            <div className={styles.text}>
              {t("in-app-navigation-next-icon-text")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InAppNavigationBar;
