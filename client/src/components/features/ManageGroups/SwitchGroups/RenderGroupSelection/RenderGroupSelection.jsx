// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

// Constants and Utils
import { setGroupCodeToCurrentlyActive } from "../../../../../utils/localStorageUtils";
import { submitOnEnterClick } from "../../../../../utils/formUtils";
import { sendFormSubmitButtonStyles } from "../../../../../constants/stylesConstants";

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
  const { t } = useTranslation();
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

  // Submit on enter button click
  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <select
          className={styles.groupSelection}
          value={selectedGroupCode}
          onChange={handleSelectChange}
          onKeyDown={handleKeyDown}>
          <option value='' disabled>
            {t("render-group-selection-placeholder")}
          </option>
          {groupNamesAndGroupCodes.map((group) => (
            <option key={group.groupCode} value={group.groupCode}>
              {group.groupName}
            </option>
          ))}
        </select>
        <FormSubmitButton {...sendFormSubmitButtonStyles} />
      </form>
    </div>
  );
};

export default RenderGroupSelection;
