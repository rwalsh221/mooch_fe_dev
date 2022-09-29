import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './layout/Register/Register';
import Dashboard from './layout/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserAccount from './layout/UserAccount/UserAccount';
import ForgotPassword from './layout/ForgotPassword/ForgotPassword';

const App = () => (
  <AuthProvider>
    {/* add private route for dashboard and account */}
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="*" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="account" element={<UserAccount />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  </AuthProvider>
);

export default App;
