// React and Third-Party Libraries
import React from "react";

// Hooks

// Components
import Spinner from "../../../common/Spinner/Spinner";

// Styles
import styles from "./DataPurgeSettings.module.css";

const DataPurgeSettings = ({ groupCode }) => {
  const isFetched = true;
  return (
    <div className={styles.container}>
      <h2>data purge</h2>
      {!isFetched ? (
        <Spinner />
      ) : (
        <div>
          As a user-centered & privacy-conscious app, InstantSplit permanently
          deletes inactive groups and their data (users, expenses & payments)
          after 180 days of group inactivity. If you wish to keep your group and
          data, please opt out here:
        </div>
      )}
    </div>
  );
};

export default DataPurgeSettings;
