import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import HomePage from "./pages/HomePage";
import "./global.css";
import CreateGroupPage from "./pages/CreateGroupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='create-group' element={<CreateGroupPage />} />
        <Route path='*' element={<PageNotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
