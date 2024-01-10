// React and Third-Party Libraries
import React from "react";

// Hooks
import useTriggerRerender from "../../../../hooks/useTriggerRerender";

// Components
import RenderUserNames from "../RenderUserNames/RenderUserNames";
import CreateUserForm from "../CreateUserForm/CreateUserForm";

/**
 * Component for creating a user within a group and rendering the groups user list.
 * Has nested components and uses a custom hook to get groupCode and trigger rerender logic.
 * @returns {JSX.Element} The rendered Create User component.
 */
const CreateUserAndRenderUserList = () => {
  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  return (
    <div>
      <CreateUserForm
        incrementRerenderTrigger={incrementRerenderTrigger}
        groupCode={groupCode}
      />
      <RenderUserNames
        rerenderTrigger={rerenderTrigger}
        groupCode={groupCode}
      />
    </div>
  );
};

export default CreateUserAndRenderUserList;
