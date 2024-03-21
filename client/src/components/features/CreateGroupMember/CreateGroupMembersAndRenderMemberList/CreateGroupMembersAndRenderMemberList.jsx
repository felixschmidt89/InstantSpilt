// React and Third-Party Libraries
import React from "react";

// Hooks
import useTriggerRerender from "../../../../hooks/useTriggerRerender";

// Components
import CreateGroupMemberForm from "../CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "../RenderGroupMemberNames/RenderGroupMemberNames";

/**
 * Container component for creating a user within a group and rendering the groups user list.
 * Has nested components and uses a custom hook to get groupCode and trigger rerender logic.
 * @returns {JSX.Element} React component. */
const CreateGroupMembersAndRenderMemberList = () => {
  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  return (
    <>
      <CreateGroupMemberForm
        incrementRerenderTrigger={incrementRerenderTrigger}
        groupCode={groupCode}
      />
      <RenderGroupMemberNames
        rerenderTrigger={rerenderTrigger}
        groupCode={groupCode}
        incrementRerenderTrigger={incrementRerenderTrigger}
      />
    </>
  );
};

export default CreateGroupMembersAndRenderMemberList;
