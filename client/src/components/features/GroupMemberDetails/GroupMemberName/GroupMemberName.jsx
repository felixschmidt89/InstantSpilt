import React, { useState, useEffect, useRef } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./GroupMemberName.module.css";
import ChangeResourceName from "../../../common/ChangeResourceName/ChangeResourceName";
import useFetchGroupMemberData from "../../../../hooks/useFetchGroupMemberData";

const GroupMemberName = ({ userId, groupCode }) => {
  const { groupMemberData, isFetched: groupMemberDataIsFetched } =
    useFetchGroupMemberData(userId);

  const [showEdit, setShowEdit] = useState(false);
  const [groupMemberName, setGroupMemberName] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (groupMemberDataIsFetched) {
      // Set groupMemberName after groupMemberData is fetched
      setGroupMemberName(groupMemberData?.userName || "");
    }
  }, [groupMemberDataIsFetched, groupMemberData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = () => {
    setShowEdit(true);
  };

  const handleChange = (newName) => {
    setShowEdit(false);
    setGroupMemberName(newName);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {groupMemberDataIsFetched && (
        <>
          {showEdit ? (
            <div className={styles.changeName}>
              <ChangeResourceName
                resourceId={userId}
                resourceType='user'
                resourceName={groupMemberName}
                groupCode={groupCode}
                inputWidth={20}
                navigateToMain={false}
                callback={handleChange}
              />
            </div>
          ) : (
            <h1 className={styles.groupMemberName}>
              {groupMemberName}{" "}
              <span
                className={styles.icon}
                onClick={handleIconClick}
                role='button'>
                <MdEdit />
              </span>
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default GroupMemberName;
