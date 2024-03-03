// React and Third-Party Libraries
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../utils/errorUtils";
import { genericErrorMessage } from "../../../constants/errorConstants";
import { submitOnEnterClick } from "../../../utils/formUtils";

// Hooks
import useErrorModalVisibility from "../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../ErrorModal/ErrorModal";

// Styles
import styles from "./ChangeResourceName.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for updating the name of a resource (e.g., user, group). Renders input field that displays stored resource name and appears inactive on mount
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.resourceId - The ID of the resource to be updated.
 * @param {string} props.resourceType - The type of the resource in singular (e.g., "user", "group").
 * @param {string} props.resourceName - The current name of the resource.
 * @param {string} props.groupCode - The groupCode of the associated group.
 * @param {string} props.headerText - The name of the resource tpye being changed displayed in the header. Prefixed by "change ".
 * @param {number} [props.inputWidth=20] - The width of the input field in rem units. Defaults to 20.
 * @param {boolean} [props.navigateToMain=true] - Flag indicating whether to navigate to the main page after updating the resource name. Defaults to true.
 * @returns {JSX.Element} React component.
 */
const ChangeResourceName = ({
  resourceId,
  resourceType,
  resourceName,
  groupCode,
  headerText,
  inputWidth = 20,
  navigateToMain = true,
}) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const storedResourceName = resourceName;
  const [newResourceName, setNewResourceName] = useState(storedResourceName);
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Convert resourceType to plural for API endpoint
      const pluralResourceType = resourceType + "s";
      const payload = {
        [resourceType]: resourceId,
        [`${resourceType}Name`]: newResourceName,
        groupCode: groupCode,
      };
      const response = await axios.patch(
        `${apiUrl}/${pluralResourceType}/${resourceId}`,
        payload
      );
      devLog(`${resourceType} name updated:`, response);
      if (navigateToMain) {
        navigate("/instant-split");
      }
      // Remove active class and blur input after successful update
      inputRef.current.classList.remove(styles.active);
      inputRef.current.blur();
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog(`Error updating ${resourceType} name:`, error);
        displayErrorModal();
      }
    }
  };

  // Add active class on any click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    inputRef.current.classList.add(styles.active);
  };

  // Submit on enter button click
  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      {headerText && <h2 className={styles.header}>{headerText}</h2>}
      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount}`}
          type='text'
          value={newResourceName}
          onClick={handleInputClick}
          onChange={(e) => setNewResourceName(e.target.value)}
          placeholder={storedResourceName}
          style={{ width: `${inputWidth}rem` }}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.3}
          translateY={0.1}
        />
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ChangeResourceName;
