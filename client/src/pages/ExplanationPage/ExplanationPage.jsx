import React from "react";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const ExplanationPage = () => {
  return (
    <main>
      <NavigateButton
        route={"create-group"}
        alignment={"right"}
        buttonText={"next"}
      />
      <h1>ℹ️ GroupCode ℹ️</h1>
      <p>
        The key to settling group expenses easily while sharing minimal data is
        the 6-digit <strong>GroupCode</strong>. <br />
        After creating your group, you'll find your <strong>
          GroupCode
        </strong>{" "}
        below your group's name. <br />
        Be sure to write it down in a safe place too.
      </p>
    </main>
  );
};

export default ExplanationPage;
