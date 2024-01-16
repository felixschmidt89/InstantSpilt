// React and Third-Party Libraries
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Components
import Footer from "./components/common/Footer/Footer";
import Header from "./components/common/Header/Header/Header";

// Pages
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage/ExpenseDetailsPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage/PaymentDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import IndexNavigatorPage from "./pages/IndexNavigatorPage/IndexNavigator";
import OnboardingTutorialPage from "./pages/OnboardingTutorialPage/OnboardingTutorialPage";
import OnboardingGroupCodeExplanationPage from "./pages/OnboardingGroupCodeExplanationPage/OnboardingGroupCodeExplanationPage";
import ForgetGroupOnDevicePage from "./pages/ForgetGroupOnDevicePage/ForgetGroupOnDevicePage";
import ShareGroupPage from "./pages/ShareGroupPage/ShareGroupPage";
import ValidateProvidedGroupCodePage from "./pages/ValidateProvidedGroupCodePage/ValidateProvidedGroupCodePage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import SettleGroupExpensesPage from "./pages/SettleGroupExpensesPage/SettleGroupExpensesPage";
import CreateUsersPage from "./pages/CreateUsersPage/CreateUsersPage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import UserTransactionHistoryPage from "./pages/UserTransactionHistoryPage/UserTransactionHistoryPage";
import AcceptGroupInvitationAndJoinPage from "./pages/AcceptGroupInvitationAndJoinPage/AcceptGroupInvitationAndJoinPage";

// Styles
import "./App.css";
import ContactPage from "./pages/ContactPage/ContactPage";
import EnterGroupCodePage from "./pages/EnterGroupCodePage/EnterGroupCodePage";

const App = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route index element={<IndexNavigatorPage />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/legal-notice' element={<LegalNoticePage />} />
          <Route
            path='/onboarding-groupcode-explanation'
            element={<OnboardingGroupCodeExplanationPage />}
          />
          <Route path='/create-group' element={<CreateGroupPage />} />
          <Route path='/enter-groupcode' element={<EnterGroupCodePage />} />
          <Route
            path='/groupCode-validator/:groupCode'
            element={<ValidateProvidedGroupCodePage />}
          />
          <Route
            path='/join-instantsplit-group/:groupName/:groupCode'
            element={<AcceptGroupInvitationAndJoinPage />}
          />
          <Route
            path='/onboarding-tutorial'
            element={<OnboardingTutorialPage />}
          />
          <Route
            path='/tutorial/:groupName/:groupCode'
            element={<TutorialPage />}
          />

          <Route path='/instant-split' element={<InstantSplitPage />} />
          <Route path='/create-expense' element={<CreateExpensePage />} />
          <Route
            path='/update-expense/:groupCode/:expenseId'
            element={<UpdateExpensePage />}
          />
          <Route path='/create-payment' element={<CreatePaymentPage />} />
          <Route
            path='/update-payment/:groupCode/:paymentId'
            element={<UpdatePaymentPage />}
          />
          <Route path='/create-users' element={<CreateUsersPage />} />
          <Route
            path='/settle-expenses'
            element={<SettleGroupExpensesPage />}
          />
          <Route
            path='/user-details/:groupCode/:userId'
            element={<UserDetailsPage />}
          />
          <Route
            path='/user-transaction-history/:groupCode/:userId'
            element={<UserTransactionHistoryPage />}
          />
          <Route
            path='/payment-details/:groupCode/:itemId'
            element={<PaymentDetailsPage />}
          />
          <Route
            path='/expense-details/:groupCode/:itemId'
            element={<ExpenseDetailsPage />}
          />
          <Route
            path='/leave-group/:groupName/:groupCode'
            element={<ForgetGroupOnDevicePage />}
          />
          <Route
            path='/share-group/:groupName/:groupCode'
            element={<ShareGroupPage />}
          />
          <Route path='/contact/:groupCode' element={<ContactPage />} />
          <Route
            path='/terms-and-conditions'
            element={<TermsAndConditionsPage />}
          />
          <Route path='*' element={<PageNotFoundPage />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
