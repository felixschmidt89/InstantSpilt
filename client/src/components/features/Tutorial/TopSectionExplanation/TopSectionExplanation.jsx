// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

// Components
import UserActionsBar from "../../UserActionsBar/UserActionsBar";
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./TopSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's top section (containing user action bar).
 * @returns {JSX.Element} React component. */
const TopSectionExplanation = () => {
  return (
    <div>
      <h2>user bar</h2>
      <div className={styles.noLink}>
        <UserActionsBar />
      </div>
      <p className={styles.explanation}>
        At the top of the main application, the user bar provides access to
        general group management settings: Share group access with your peers or
        your other devices, switch between groups, or create new ones.
        Additionally, access the tutorial or provide feedback to the
        InstantSplit team. We are always eager to improve!
      </p>
      <div>
        <Link to='/instant-split' className={styles.mainAppLink}>
          Proceed to main app
        </Link>
      </div>
    </div>
  );
};

export default TopSectionExplanation;
