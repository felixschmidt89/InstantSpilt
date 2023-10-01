import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import NavigateIcon from "../NavigateIcon/NavigateIcon";

const UserActionsComponent = () => {
  return (
    <NavigateIcon icon={faUser} route='/leave-group' tooltip='Leave Group' /> // Use the imported icon
  );
};

export default UserActionsComponent;
