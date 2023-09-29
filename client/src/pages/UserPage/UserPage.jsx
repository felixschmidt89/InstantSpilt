import React from "react";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const UserPage = () => {
  return (
    <main>
      <NavigateButton route={"instant-split"} buttonText={"back"} />

      <h1>User Page</h1>
      <p>Add features</p>
    </main>
  );
};

export default UserPage;
