import React from "react";
import ReactDOM from "react-dom/client";
import User from "../../server/models/User";
import ListGroups from "./components/ListGroups";
import "./index.css";
import CreateGroup from "./local-components/CreateGroup";
import CreateUsers from "./pages/CreateUsers";

// FOR TESTING COMPONENTS WHILE STILL AT AN EARLY STAGE OF BUILDING THE MVP

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateGroup />
    <CreateUsers />
    <ListGroups />
    <User />
  </React.StrictMode>
);
