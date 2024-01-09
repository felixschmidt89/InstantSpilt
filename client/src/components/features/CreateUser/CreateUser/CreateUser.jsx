import React from "react";
import useTriggerRerender from "../../../../hooks/useTriggerRerender";
import RenderUserNames from "../RenderUserNames/RenderUserNames";
import CreateUserForm from "../CreateUserForm/CreateUserForm";

const CreateUser = () => {
  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, toggleRerender } = useTriggerRerender();

  return (
    <div>
      <CreateUserForm toggleRerender={toggleRerender} groupCode={groupCode} />
      <RenderUserNames
        rerenderTrigger={rerenderTrigger}
        groupCode={groupCode}
      />
    </div>
  );
};

export default CreateUser;
