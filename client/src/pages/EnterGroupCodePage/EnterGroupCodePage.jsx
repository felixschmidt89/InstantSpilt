// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import FormSubmitButton from "../../components/common/FormSubmitButton/FormSubmitButton";

// Styles
import style from "./EnterGroupCodePage.module.css";

const EnterGroupCodePage = () => {
  const [groupCode, setGroupCode] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/groupCode-validator/${groupCode}`);
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - enter groupCode' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-enter-groupcode"} />
      <InAppNavigationBar back={true} backRoute='/homepage' />
      <div className={style.container}>
        <h1>Enter groupCode</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            className={style.inputField}
            type='text'
            placeholder='groupCode'
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <FormSubmitButton
            fontSize={1.6}
            submit={true}
            marginLeft='0.1'
            transformScale={1.3}
            translateX={0.3}
            translateY={0.1}
          />
        </form>
      </div>
    </main>
  );
};

export default EnterGroupCodePage;
