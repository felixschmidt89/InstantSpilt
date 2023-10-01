import React, { useState } from "react";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import InlineNavigateButtons from "../../components/InlineNavigateButtons/InlineNavigateButtons";

const EnterGroupCode = ({ storeGroupCodesInLocalStorageHelper }) => {
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
      storeGroupCodesInLocalStorageHelper(groupCode);
      console.log(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      navigate("instant-split");
    }
  };

  return (
    <main>
      <NavigateButton
        route={"homepage"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Enter group code</h1>
      <p>
        {" "}
        Send yourself an invite from another device where you're already using
        InstantSplit. Ask your friends to send you an invite or the your
        GroupCode
      </p>
      <input
        type='text'
        placeholder='Enter Group Code'
        value={groupCode}
        onChange={handleInputChange}
        className={isInvalid ? "invalid" : ""}
      />
      {groupCode.length === 6 && (
        <button onClick={handleEnterClick}>Enter</button>
      )}
    </main>
  );
};

export default EnterGroupCode;
