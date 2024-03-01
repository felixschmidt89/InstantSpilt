// React and Third-Party Libraries
import React from "react";

// Hooks
import useTriggerRerender from "../../../../hooks/useTriggerRerender";

// Components
import RenderUserNames from "../RenderUserNames/RenderUserNames";
import CreateUserForm from "../CreateUserForm/CreateUserForm";

// Styles
import styles from "./CreateUserAndRenderUserList.module.css";

/**
 * Component for creating a user within a group and rendering the groups user list.
 * Has nested components and uses a custom hook to get groupCode and trigger rerender logic.
 * @returns {JSX.Element} React component. */
const CreateUserAndRenderUserList = () => {
  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  return (
    <div className={styles.container}>
      <CreateUserForm
        incrementRerenderTrigger={incrementRerenderTrigger}
        groupCode={groupCode}
      />
      <div className={styles.usernames}>
        <RenderUserNames
          rerenderTrigger={rerenderTrigger}
          groupCode={groupCode}
          incrementRerenderTrigger={incrementRerenderTrigger}
        />
      </div>
    </div>
  );
};

export default CreateUserAndRenderUserList;
