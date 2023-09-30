import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import "./global.css";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import {
  CreateUsersBackButtonPage,
  CreateUsersNextButtonPage,
} from "./pages/CreateUsersPage/CreateUsersPage";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage";
import UserPage from "./pages/UserPage/UserPage";
import ItemNavigatorPage from "./pages/ItemNavigatorPage/ItemNavigatorPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import IndexNavigator from "./pages/IndexNavigator/IndexNavigator";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<IndexNavigator />} />
        <Route path='homepage' element={<HomePage />} />
        <Route path='create-group' element={<CreateGroupPage />} />
        <Route
          path='create-users-signup'
          element={<CreateUsersNextButtonPage />}
        />
        <Route path='instant-split' element={<InstantSplitPage />} />
        <Route path='create-expense' element={<CreateExpensePage />} />
        <Route path='create-payment' element={<CreatePaymentPage />} />
        <Route
          path='create-users-inapp'
          element={<CreateUsersBackButtonPage />}
        />
        <Route path='/item-page' element={<ItemNavigatorPage />} />
        <Route path='user-page/:userId' element={<UserPage />} />
        <Route path='payment-page/:itemId' element={<PaymentPage />} />
        <Route path='expense-page/:itemId' element={<ExpensePage />} />

        <Route path='*' element={<PageNotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
