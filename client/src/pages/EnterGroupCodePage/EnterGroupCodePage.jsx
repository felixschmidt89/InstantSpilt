import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import style from "./EnterGroupCodePage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

const EnterGroupCode = () => {
  const [groupCode, setGroupCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setGroupCode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (groupCode.length >= 6) {
      navigate(`/groupCode-validator/${groupCode}`);
    }
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Enter groupCode' />
      <NavigateButton
        route={"homepage"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <PiratePx COUNT_IDENTIFIER={"enter-groupcode"} />;
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

export default EnterGroupCode;
