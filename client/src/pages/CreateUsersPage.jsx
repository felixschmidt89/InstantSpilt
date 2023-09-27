import React from "react";
import { useState } from "react";
import CreateUser from "../components/CreateUser";
import RenderUserNames from "../components/RenderUserNames";

function CreateUsersPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <div>
      <CreateUser toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </div>
  );
}

export default CreateUsersPage;
