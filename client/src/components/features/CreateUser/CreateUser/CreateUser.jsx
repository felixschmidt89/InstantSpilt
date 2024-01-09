import React from "react";
import useTriggerRerender from "../../../../hooks/useTriggerRerender";
import RenderUserNames from "../RenderUserNames/RenderUserNames";
import CreateUsersInAppPage from "../../../../pages/CreateUsersInAppPage/CreateUsersInAppPage";

const CreateUser = () => {
  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, toggleRerender } = useTriggerRerender();

  return (
    <div>
      <CreateUsersInAppPage
        toggleRerender={toggleRerender}
        groupCode={groupCode}
      />
      <RenderUserNames
        rerenderTrigger={rerenderTrigger}
        groupCode={groupCode}
      />
    </div>
  );
};

export default CreateUser;
