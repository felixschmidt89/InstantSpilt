import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

const ValidateJoinGroupCodePage = () => {
  const { groupCode } = useParams();
  console.log(groupCode);
  const groupExists = useValidateGroupExistence({ groupCode });
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false); // To track user confirmation

  useEffect(() => {
    if (groupExists === true && confirmed) {
      // If group exists and user confirmed, add group code to local storage
      // Note: You can use your own function to store the group code
      // storeGroupCodesInLocalStorageHelper(groupCode);
      navigate("/instant-split");
    }
  }, [groupExists, groupCode, navigate, confirmed]);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <main className={styles.container}>
      <h1>Group Invitation</h1>
      {/* Handle different outcomes */}
      {groupExists === null && <p>Validating groupCode...</p>}
      {groupExists === false && (
        <div>
          <p>
            🚧 Oops, there's no group associated with the provided GroupCode.
          </p>
          <Link to='/homepage'>Go to main</Link>
        </div>
      )}
      {groupExists === true && !confirmed && (
        <div>
          <p>You've been invited to</p>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </main>
  );
};

export default ValidateJoinGroupCodePage;
