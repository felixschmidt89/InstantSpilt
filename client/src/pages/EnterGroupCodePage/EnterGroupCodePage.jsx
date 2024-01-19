// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ValidateGroupCode from "../../components/features/ManageGroups/ValidateGroupCode/ValidateGroupCode";

// Styles
import style from "./EnterGroupCodePage.module.css";

const EnterGroupCodePage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - enter groupCode' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-enter-groupcode"} />
      <InAppNavigationBar back={true} backRoute='/' />
      <div className={style.container}>
        <h1>Enter groupCode</h1>
        <ValidateGroupCode />
      </div>
    </main>
  );
};

export default EnterGroupCodePage;
