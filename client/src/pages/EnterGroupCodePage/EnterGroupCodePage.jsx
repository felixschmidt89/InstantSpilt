import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import style from "./EnterGroupCodePage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

const EnterGroupCodePage = () => {
  const [groupCode, setGroupCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setGroupCode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (groupCode.length >= 6) {
      navigate(`/groupCode-validator/${groupCode}`);
    }
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
            onChange={handleInputChange}
          />
          {groupCode.length >= 6 && (
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
