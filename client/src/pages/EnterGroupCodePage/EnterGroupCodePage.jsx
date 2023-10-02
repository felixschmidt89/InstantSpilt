import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import style from "./EnterGroupCodePage.module.css";

const EnterGroupCode = () => {
  const [groupCode, setGroupCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setGroupCode(e.target.value);
  };

  const handleEnterClick = async () => {
    if (groupCode.length === 6) {
      navigate(`/groupCode-validator/${groupCode}`);
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
