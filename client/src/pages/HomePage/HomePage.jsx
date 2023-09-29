import React from "react";
import { Link } from "react-router-dom";
import InstantSplitPage from "../InstantSplitPage";

const HomePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <main>
      {groupCode ? (
        <InstantSplitPage />
      ) : (
        <>
          <h1>Welcome to InstantSplit!</h1>
          <p>
            InstantSplit is the hassle-free way to settle group expenses – no
            user registration, no app download.
            <br />
            The key to this while sharing minimal data is your{" "}
            <strong>GroupCode</strong>. So guard it well after signing up!
          </p>
          <br />
          <h2>Get started</h2>
          <h3>Create a new group</h3>
          <Link to='/create-group'>HERE</Link>
          <h3>Or join an existing group by</h3>
          <ul>
            <li>1️⃣ Entering your GroupCode here</li>
            <li>
              2️⃣ Sending yourself an invite from another device where you're
              already using InstantSplit.
            </li>
            <li>3️⃣ Asking your friends to send you an invite</li>
          </ul>
        </>
      )}
    </main>
  );
};

export default HomePage;
