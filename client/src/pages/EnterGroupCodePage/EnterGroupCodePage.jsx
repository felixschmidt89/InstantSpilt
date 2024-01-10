import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import style from "./EnterGroupCodePage.module.css";

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
      <NavigateButton
        route={"homepage"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
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
