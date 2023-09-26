import React from "react";
import { useState } from "react";
import CreateUser from "../local-components/CreateUser";
import ListGroupUsers from "../components/ReusableComponents/FetchGroupUsers";

function CreateUsers() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <div>
      <CreateUser toggleDataRefresh={toggleDataRefresh} />
      <ListGroupUsers refreshData={refreshData} />
    </div>
  );
}

export default CreateUsers;
