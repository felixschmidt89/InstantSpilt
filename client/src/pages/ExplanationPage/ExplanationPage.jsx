import React from "react";
import InlineNavigateButtons from "../../components/InlineNavigateButtons/InlineNavigateButtons";

const ExplanationPage = () => {
  return (
    <main>
      <InlineNavigateButtons
        buttonData={[
          {
            route: "homepage",
            buttonText: "back",
            alignment: "left",
          },
          {
            route: "create-group",
            buttonText: "next",
            alignment: "right",
          },
        ]}
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
