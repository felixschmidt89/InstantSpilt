import React from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import "./global.css";
import InstantSplitPage from "./pages/InstantSplitPage";
import ListGroups from "./components/ListGroups.jsx";
import CreateGroupPage from "./pages/CreateGroupPage.jsx";
import CreateUsersPage from "./pages/CreateUsersPage.jsx";

// FOR TESTING COMPONENTS WHILE STILL AT AN EARLY STAGE OF BUILDING MVP/FE

function App() {
  return (
    <>
      <Header />
      <InstantSplitPage />
      <CreateGroupPage />
      <ListGroups />
      <CreateUsersPage />
      <Footer />
    </>
  );
}

export default App;
