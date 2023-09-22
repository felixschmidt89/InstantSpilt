import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CreateGroup from "./local-components/CreateGroup";
import CreateUsers from "./pages/CreateUsers";
import ListGroupExpenses from "./hooks/FetchGroupExpenses";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreateGroup />
    <CreateUsers />
    <ListGroupExpenses />
  </React.StrictMode>
);
