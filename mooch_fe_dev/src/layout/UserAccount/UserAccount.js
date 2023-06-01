import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import classes from './UserAccount.module.css';

import { useAuth } from '../../contexts/AuthContext';

const UserSettings = () => {
  // ADD USER UPADTE FIELDS WATCH LAST CHAPTER
  const [error, setError] = useState('');
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setError('');
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      setError('sign out failed');
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2 data-heading="secondary">My Account</h2>
      {error}
      <strong>Email:</strong>&nbsp;{currentUser.email}
      <button onClick={handleSignOut} type="button">
        log out
      </button>
      <Link to="/update-account">Update Profile</Link>
    </div>
  );
};

export default UserSettings;
