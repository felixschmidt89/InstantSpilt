import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import Components
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";

// Import Pages
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import ItemNavigatorPage from "./pages/ItemNavigatorPage/ItemNavigatorPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ExpensePage from "./pages/ExpensePage/ExpensePage";
import IndexNavigatorPage from "./pages/IndexNavigatorPage/IndexNavigator";
import EnterGroupCode from "./pages/EnterGroupCodePage/EnterGroupCodePage";
import GroupCodeExplanationPage from "./pages/GroupCodeExplanationPage/GroupCodeExplanationPage";
import ForgetGroupOnDevicePage from "./pages/ForgetGroupOnDevicePage/ForgetGroupOnDevicePage";
import ShareGroupPage from "./pages/ShareGroupPage/ShareGroupPage";
import ValidateProvidedGroupCodePage from "./pages/ValidateProvidedGroupCodePage/ValidateProvidedGroupCodePage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import SettleGroupExpensesPage from "./pages/SettleGroupExpensesPage/SettleGroupExpensesPage";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import CreateUsersDuringSignUpPage from "./pages/CreateUsersDuringSignUpPage/CreateUsersDuringSignUpPage";
import CreateUsersInAppPage from "./pages/CreateUsersInAppPage/CreateUsersInAppPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage";
import AcceptInviteAndJoinPage from "./pages/AcceptInviteAndJoinPage/AcceptInviteAndJoinPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import TermsAndConditionsViaInvitePage from "./pages/TermsAndConditionsViaInvitePage/TermsAndConditionsViaInvitePage";
import UserHistoryPage from "./pages/UserHistoryPage/UserHistoryPage";
import ItemNavigatorUserHistoryPage from "./pages/ItemNavigatorUserHistoryPage/ItemNavigatorUserHistoryPage";
import UpdateUserExpensePage from "./pages/UpdateExpenseUserPage/UpdateExpenseUserPage";
import UserHistoryUpdatePaymentPage from "./pages/UserHistoryUpdatePaymentPage/UserHistoryUpdatePaymentPage";

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
            path='/groupcode-explanation'
            element={<GroupCodeExplanationPage />}
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
            path='/join/:groupName/:groupCode'
            element={<AcceptInviteAndJoinPage />}
          />
          <Route path='/onboarding' element={<OnboardingPage />} />
          <Route
            path='/tutorial/:groupName/:groupCode'
            element={<TutorialPage />}
          />

          <Route path='/instant-split' element={<InstantSplitPage />} />
          <Route path='/create-expense' element={<CreateExpensePage />} />
          <Route
            path='/update-expense/:expenseId'
            element={<UpdateExpensePage />}
          />
          <Route
            path='/update-user-expense/:userId/:expenseId'
            element={<UpdateUserExpensePage />}
          />
          <Route path='/create-payment' element={<CreatePaymentPage />} />
          <Route
            path='/update-payment/:itemId'
            element={<UpdatePaymentPage />}
          />
          <Route
            path='/update-user-payment/:userId/:itemId'
            element={<UserHistoryUpdatePaymentPage />}
          />
          <Route
            path='/create-users-inapp'
            element={<CreateUsersInAppPage />}
          />
          <Route
            path='/settle-expenses'
            element={<SettleGroupExpensesPage />}
          />

          <Route path='/item-page' element={<ItemNavigatorPage />} />
          <Route
            path='/user-history-item-page'
            element={<ItemNavigatorUserHistoryPage />}
          />

          <Route path='/user-page/:userId' element={<UserDetailsPage />} />
          <Route path='/user-history/:userId' element={<UserHistoryPage />} />

          <Route path='/payment-page/:itemId' element={<PaymentPage />} />
          <Route path='/expense-page/:itemId' element={<ExpensePage />} />
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
          <Route
            path='/terms-and-conditions/invite/:groupName/:groupCode'
            element={<TermsAndConditionsViaInvitePage />}
          />

          <Route path='*' element={<PageNotFoundPage />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
