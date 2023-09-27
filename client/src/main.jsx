import React from "react";
import ReactDOM from "react-dom/client";
import ListGroups from "./components/ListGroups.jsx";
import CreateGroupPage from "./pages/CreateGroupPage.jsx";
import CreateUsersPage from "./pages/CreateUsersPage.jsx";
import InstantSplitPage from "./pages/InstantSplitPage.jsx";

// FOR TESTING COMPONENTS WHILE STILL AT AN EARLY STAGE OF BUILDING MVP/FE

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateGroupPage />
    <ListGroups />
    <CreateUsersPage />
    <InstantSplitPage />
  </React.StrictMode>
);
