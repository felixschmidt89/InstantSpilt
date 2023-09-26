import React from "react";

export default function ListUsers({ userNames }) {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {userNames.map((userName) => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </div>
  );
}
