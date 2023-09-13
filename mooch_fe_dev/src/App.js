import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorComponents/ErrorBoundary/ErrorBoundary';

import Register from './layout/Register/Register';
import Dashboard from './layout/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserAccount from './layout/UserAccount/UserAccount';
import ForgotPassword from './layout/ForgotPassword/ForgotPassword';
import RegisterConfirm from './layout/RegisterConfirm/RegisterConfirm';
import ErrorBoundaryFallback from './components/ErrorComponents/ErrorBoundary/ErrorBoundaryFallback/ErrorBoundaryFallback';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="*" element={<Register />} />
      <Route path="landing" element={<Register />} />
      <Route
        path="dashboard"
        element={
          <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <Dashboard />
          </ErrorBoundary>
        }
        exact
      />
      <Route
        path="account"
        element={
          <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <UserAccount />
          </ErrorBoundary>
        }
      />
      <Route
        path="forgot-password"
        element={
          <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <ForgotPassword />
          </ErrorBoundary>
        }
      />
      <Route path="register-confirm" element={<RegisterConfirm />} />
    </Routes>
  </AuthProvider>
);

export default App;
