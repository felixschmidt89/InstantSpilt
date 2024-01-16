// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

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
      <PiratePx COUNT_IDENTIFIER={"enter-groupcode"} />
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
          {groupCode.length >= 1 && (
            <div className={style.buttonContainer}>
              <button type='submit' className={style.button}>
                join
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default EnterGroupCodePage;
