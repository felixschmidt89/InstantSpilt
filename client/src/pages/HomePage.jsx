import React from "react";
import InstantSplitPage from "./InstantSplitPage"; // Import your InstantSplitPage component

const HomePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <div>
      {groupCode ? (
        <InstantSplitPage />
      ) : (
        <>
          <h1>Welcome to InstantSplit!</h1>
          <p>
            The hassle-free way to split group expenses – no user registration,
            no app downloads. The key to sharing minimal data while effortlessly
            settling expenses is your groupCode. So guard it well after signing
            up!
          </p>
          <br></br>
          <h2>No groups found on this device</h2>
          <ul>
            <li>Enter your groupCode here</li>
            <li>
              📱💻 Send you an invite from your logged in device or ask your
              friends to do so 🤝
            </li>
            <li>Or create a new group </li>
          </ul>{" "}
        </>
      )}
    </div>
  );
};

export default HomePage;
