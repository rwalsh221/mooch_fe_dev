import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './layout/Register/Register';
import Dashboard from './layout/Dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import UserAccount from './layout/UserAccount/UserAccount';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Register />} />
      <Route path="account" element={<UserAccount />} />
    </Routes>
  </AuthProvider>
);

export default App;
