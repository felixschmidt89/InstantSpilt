import React, { useState } from "react";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import style from "./EnterGroupCodePage.module.css";

const EnterGroupCode = () => {
  const [groupCode, setGroupCode] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const groupCode = e.target.value;
    setGroupCode(groupCode);
    setIsInvalid(groupCode.length !== 6);
  };

  const handleEnterClick = () => {
    if (!isInvalid) {
      console.log(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      navigate("/instant-split");
    }
  };

  return (
    <main>
      <NavigateButton
        route={"homepage"}
        buttonText={"back"}
        alignment={"left"}
      />
      <div className={style.container}>
        <h1>Enter groupCode</h1>
        <input
          className={style.inputField}
          type='text'
          placeholder='groupCode'
          value={groupCode}
          onChange={handleInputChange}
        />
        {groupCode.length === 6 && (
          <button className={style.button} onClick={handleEnterClick}>
            join
          </button>
        )}
      </div>
    </main>
  );
};

export default EnterGroupCode;
