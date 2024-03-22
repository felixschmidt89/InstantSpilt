// React and Third-Party Libraries
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";

// Themes
import muiTheme from "./themes/muiTheme";

// Components
import Footer from "./components/common/Footer/Footer";

// Pages
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import OnboardingCreateGroupPage from "./pages/OnboardingCreateGroupPage/OnboardingCreateGroupPage";
import InstantSplitPage from "./pages/InstantSplitPage/InstantSplitPage";
import CreateExpensePage from "./pages/CreateExpensePage/CreateExpensePage";
import CreatePaymentPage from "./pages/CreatePaymentPage/CreatePaymentPage";
import ExpenseDetailsPage from "./pages/ExpenseDetailsPage/ExpenseDetailsPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage/PaymentDetailsPage";
import OnboardingGroupSettingsPage from "./pages/OnboardingGroupSettingsPage/OnboardingGroupSettingsPage";
import ValidateProvidedGroupCodePage from "./pages/ValidateProvidedGroupCodePage/ValidateProvidedGroupCodePage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import UpdateExpensePage from "./pages/UpdateExpensePage/UpdateExpensePage";
import UpdatePaymentPage from "./pages/UpdatePaymentPage/UpdatePaymentPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import EnterGroupCodePage from "./pages/EnterGroupCodePage/EnterGroupCodePage";
import ManageGroupsPage from "./pages/ManageGroupsPage/ManageGroupsPage";
import GroupSettingsPage from "./pages/GroupSettingsPage/GroupSettingsPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ShareGroupInvitationPage from "./pages/ShareGroupInvitationPage/ShareGroupInvitationPage";
import LeaveGroupPage from "./pages/LeaveGroupPage/LeaveGroupPage";
import JoinGroupDEPage from "./pages/JoinGroupDEPage/JoinGroupDEPage";
import JoinGroupENPage from "./pages/JoinGroupENPage/JoinGroupENPage";
import CreateGroupMemberPage from "./pages/CreateGroupMemberPage/CreateGroupMemberPage";
import SettleExpensesPage from "./pages/SettleExpensesPage/SettleExpensesPage";
import GroupMemberDetailsPage from "./pages/GroupMemberDetailsPage/GroupMemberDetailsPage";
import GroupMemberTransactionHistoryPage from "./pages/GroupMemberTransactionHistoryPage/GroupMemberTransactionHistoryPage";

// Styles
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/legal-notice' element={<LegalNoticePage />} />
            <Route
              path='/onboarding-group-settings'
              element={<OnboardingGroupSettingsPage />}
            />
            <Route
              path='/onboarding-create-group'
              element={<OnboardingCreateGroupPage />}
            />
            <Route
              path='/onboarding-enter-groupcode'
              element={<EnterGroupCodePage />}
            />
            <Route
              path='/groupCode-validator/:groupCode'
              element={<ValidateProvidedGroupCodePage />}
            />
            <Route
              path='/join-instantsplit-group/:initialGroupName/:groupCode'
              element={<JoinGroupDEPage />}
            />
            <Route
              path='/join-en-instantsplit-group/:initialGroupName/:groupCode'
              element={<JoinGroupENPage />}
            />
            <Route
              path='/tutorial/:initialGroupName/:groupCode'
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
              path='/create-group-members'
              element={<CreateGroupMemberPage />}
            />
            <Route path='/settle-expenses' element={<SettleExpensesPage />} />
            <Route
              path='/groupmember-details/:groupCode/:userId'
              element={<GroupMemberDetailsPage />}
            />
            <Route
              path='/groupmember-transaction-history/:groupCode/:userId'
              element={<GroupMemberTransactionHistoryPage />}
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
              element={<LeaveGroupPage />}
            />
            <Route
              path='/share-group/:initialGroupName/:groupCode'
              element={<ShareGroupInvitationPage />}
            />
            <Route path='/manage-groups' element={<ManageGroupsPage />} />
            <Route path='/contact/:groupCode' element={<ContactPage />} />
            <Route path='/group-settings' element={<GroupSettingsPage />} />
            <Route
              path='/terms-and-conditions'
              element={<TermsAndConditionsPage />}
            />
            <Route path='*' element={<PageNotFoundPage />} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
