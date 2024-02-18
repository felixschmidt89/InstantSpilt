// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { setGroupCodeToCurrentlyActive } from "../../../../../utils/localStorageUtils";

// Components
import FormSubmitButton from "../../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./RenderGroupSelection.module.css";

/**
 * Component for rendering groups associated with the device and navigating to such a group upon selection.
 *
 * @param {Object} props - Component props.
 * @param {string} props.groupCode - The active group code.
 * @param {Array} props.groupNamesAndGroupCodes - Array of associated group names and groupCodes.
 * @returns {JSX.Element} React component.
 */
const RenderGroupSelection = ({ groupCode, groupNamesAndGroupCodes }) => {
  const navigate = useNavigate();
  const [selectedGroupCode, setSelectedGroupCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedGroupCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedGroupCode) {
      setGroupCodeToCurrentlyActive(selectedGroupCode);
      navigate(`/instant-split`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <select
          className={styles.groupSelection}
          value={selectedGroupCode}
          onChange={handleSelectChange}>
          <option value='' disabled>
            choose group
          </option>
          {groupNamesAndGroupCodes.map((group) => (
            <option key={group.groupCode} value={group.groupCode}>
              {group.groupName}
            </option>
          ))}
        </select>
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
  );
};

export default RenderGroupSelection;
