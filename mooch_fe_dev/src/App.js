import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorComponents/ErrorBoundary/ErrorBoundary';

import Register from './layout/Register/Register';
import Dashboard from './layout/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserAccount from './layout/UserAccount/UserAccount';
import ForgotPassword from './layout/ForgotPassword/ForgotPassword';
import RegisterConfirm from './layout/RegisterConfirm/RegisterConfirm';

const App = () => (
  <AuthProvider>
    <ErrorBoundary fallback={<Register />}>
      {/* add private route for dashboard and account */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="*" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} exact />
        <Route path="account" element={<UserAccount />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register-confirm" element={<RegisterConfirm />} />
      </Routes>
    </ErrorBoundary>
  </AuthProvider>
);

export default App;
