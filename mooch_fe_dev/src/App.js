import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './layout/Register/Register';
import Dashboard from './layout/Dashboard/Dashboard';

const App = () => (
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<Register />} />
  </Routes>
);

export default App;
