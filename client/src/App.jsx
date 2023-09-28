import React from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import "./global.css";
import InstantSplitPage from "./pages/InstantSplitPage";
import CreateGroupPage from "./pages/CreateGroupPage.jsx";
import CreateUsersPage from "./pages/CreateUsersPage.jsx";
import CreatePayment from "./components/CreatePayment";

// FOR TESTING COMPONENTS WHILE STILL AT AN EARLY STAGE OF BUILDING MVP/FE

function App() {
  return (
    <>
      <Header />
      <main>
        <CreateGroupPage />
        <CreateUsersPage />
        <CreatePayment />
        <InstantSplitPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
