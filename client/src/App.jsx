import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import HomePage from "./pages/HomePage";
import "./global.css";

// FOR TESTING COMPONENTS WHILE STILL AT AN EARLY STAGE OF BUILDING MVP/FE

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='*' element={<PageNotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
