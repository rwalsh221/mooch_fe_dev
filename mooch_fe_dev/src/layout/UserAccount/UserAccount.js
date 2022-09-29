import React, { useState } from 'react';
import classes from './UserAccount.module.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserSettings = () => {
  const [error, setError] = useState('');
  const handleLogout = () => {};
  const { currentUser } = useAuth();

  return (
    <div>
      <h2 data-heading="secondary">My Account</h2>
      {error}
      <strong>Email:</strong>&nbsp;{currentUser.email}
      <button onClick={handleLogout}>log out</button>
      <Link to="/update-account">Update Profile</Link>
    </div>
  );
};

export default UserSettings;
