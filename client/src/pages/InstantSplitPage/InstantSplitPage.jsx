// DONE adding only meaningful necessary comments
import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import { useNavigate } from "react-router-dom";
import UserActionsComponent from "../../components/containerComponents/UserActionsComponent/UserActionsComponent";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import GroupBalances from "../../components/containerComponents/GroupBalances/GroupBalances";
import GroupHistory from "../../components/containerComponents/GroupHistory/GroupHistory";
import GroupActionsComponent from "../../components/containerComponents/SplitExpensesActionsComponent/SplitExpensesActionsComponent";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorage";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

/**
 * Main component of the application. Checks on mount whether active groupCode exists in database. If not, groupCode will
 * be deleted from LocalStorage and navigated to homepage.
 * Renders or links to all core features related to settling expenses.
 */
export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");
  const navigate = useNavigate();

  // Check if active groupCode is valid
  const [groupExists] = useValidateGroupExistence({
    groupCode,
  });

  // If not, delete it from LocalSpace and navigate to homepage
  useEffect(() => {
    if (groupExists === false) {
      removeActiveGroupCodeFromLocalStorage();
      navigate("/homepage/");
    }
  }, [navigate, groupExists]);

  // Fetch group group data
  const groupData = useFetchGroupData(groupCode);

  // Use useLocalStorage to initialize and persist the view state with a default of "view2"
  const [view, setView] = useLocalStorage("viewState", "view2");

  // Handle user view switches
  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };
  // Render spinner until data is fetched
  if (groupData === null) {
    return (
      <main>
        <Spinner />
      </main>
    );
  } else if (groupData && groupData.group) {
    return (
      <main>
        <HelmetMetaTagsNetlify
          title={`InstantSplit - Main (${groupData.group.groupName})`}
        />
        <PiratePx COUNT_IDENTIFIER={"instant-split"} />

        {/* Display group name */}
        <h1>{groupData.group.groupName}</h1>
        {/* Display UserActionsComponent */}
        <UserActionsComponent
          groupCode={groupCode}
          groupName={groupData.group.groupName}
        />
        <div className={styles.buttonContainer}>
          {/* Button to render group Balances view (default) */}
          <button
            className={`${styles.button} ${
              view === "view2" ? styles.expensesButton : styles.balancesButton
            } ${view === "view2" ? "" : styles.inactiveButton}`}
            onClick={handleSwitchView}
            disabled={view === "view2"}>
            Balances
          </button>
          {/* Button to render group History view */}
          <button
            className={`${styles.button} ${
              view === "view1" ? styles.expensesButton : styles.balancesButton
            } ${view === "view1" ? "" : styles.inactiveButton}`}
            onClick={handleSwitchView}
            disabled={view === "view1"}>
            History
          </button>
        </div>
        {view === "view1" ? <GroupHistory /> : <GroupBalances />}
        {/* Display GroupActionsComponent */}
        <GroupActionsComponent />
      </main>
    );
  }
}
