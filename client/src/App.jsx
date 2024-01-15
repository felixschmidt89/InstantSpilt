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
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import IndexNavigatorPage from "./pages/IndexNavigatorPage/IndexNavigator";
import EnterGroupCode from "./pages/EnterGroupCodePage/EnterGroupCodePage";
import OnboardingTutorialPage from "./pages/OnboardingTutorialPage/OnboardingTutorialPage";
import OnboardingGroupCodeExplanationPage from "./pages/OnboardingGroupCodeExplanationPage/OnboardingGroupCodeExplanationPage";
import ForgetGroupOnDevicePage from "./pages/ForgetGroupOnDevicePage/ForgetGroupOnDevicePage";
import ShareGroupPage from "./pages/ShareGroupPage/ShareGroupPage";
import ValidateProvidedGroupCodePage from "./pages/ValidateProvidedGroupCodePage/ValidateProvidedGroupCodePage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import SettleGroupExpensesPage from "./pages/SettleGroupExpensesPage/SettleGroupExpensesPage";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import CreateUsersDuringSignUpPage from "./pages/CreateUsersDuringSignUpPage/CreateUsersDuringSignUpPage";
import CreateUsersInAppPage from "./pages/CreateUsersInAppPage/CreateUsersInAppPage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage";
import AcceptInviteAndJoinPage from "./pages/AcceptInviteAndJoinPage/AcceptInviteAndJoinPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import UserTransactionHistoryPage from "./pages/UserTransactionHistoryPage/UserTransactionHistoryPage";
import ItemNavigatorUserHistoryPage from "./pages/ItemNavigatorUserHistoryPage/ItemNavigatorUserHistoryPage";

// Styles
import "./App.css";

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
          <Route
            path='/create-users-signup'
            element={<CreateUsersDuringSignUpPage />}
          />
          <Route path='/enter-groupcode' element={<EnterGroupCode />} />
          <Route
            path='/groupCode-validator/:groupCode'
            element={<ValidateProvidedGroupCodePage />}
          />
          <Route
            path='/join-instantsplit-group/:groupName/:groupCode'
            element={<AcceptInviteAndJoinPage />}
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
          <Route
            path='/create-users-inapp'
            element={<CreateUsersInAppPage />}
          />
          <Route
            path='/settle-expenses'
            element={<SettleGroupExpensesPage />}
          />
          <Route
            path='/user-history-item-page'
            element={<ItemNavigatorUserHistoryPage />}
          />

          <Route
            path='/user-page/:groupCode/:userId'
            element={<UserDetailsPage />}
          />
          <Route
            path='/user-transaction-history/:groupCode/:userId'
            element={<UserTransactionHistoryPage />}
          />

          <Route
            path='/payment-page/:groupCode/:itemId'
            element={<PaymentPage />}
          />
          <Route
            path='/expense-page/:groupCode/:itemId'
            element={<ExpensePage />}
          />
          <Route
            path='/leave-group/:groupName/:groupCode'
            element={<ForgetGroupOnDevicePage />}
          />
          <Route
            path='/share-group/:groupName/:groupCode'
            element={<ShareGroupPage />}
          />
          <Route path='/feedback/:groupCode' element={<FeedbackPage />} />
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
