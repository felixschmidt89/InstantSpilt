import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchGroupData from "../../hooks/useFetchGroupData"; // Update the import path accordingly

const AcceptInviteAndJoinPage = () => {
  const { groupCode } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true
  const groupData = useFetchGroupData(groupCode);

  // useEffect to set isLoading to false when data is received
  useEffect(() => {
    if (groupData !== null || groupData !== undefined) {
      setIsLoading(false);
    }
  }, [groupData]);

  if (!isLoading) {
    console.log(groupData);
  }

  return <div></div>;
};

export default AcceptInviteAndJoinPage;
