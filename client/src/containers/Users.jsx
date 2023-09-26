import React from "react";
import useFetchGroupUsers from "../hooks/useFetchGroupUsers";
import ListUsers from "../components/ReusableComponents/ListUsers";

export default function GroupUsersContainer({ refreshData }) {
  const { userNames, error } = useFetchGroupUsers({ refreshData });

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Group members</h1>
      <ListUsers userNames={userNames} />
    </div>
  );
}
