import React from 'react';
import classes from './Header.module.css';

import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';

const Header = ({ signOutProps }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <header className={classes.header}>
      <div data-wrapper="max-content-width">
        <div className={classes.header_content}>
          <h1 className={classes.heading} data-heading={'logo'}>
            MoOCH
          </h1>
          {signOutProps && (
            <ButtonGreen
              contentProps={'Sign Out'}
              onClickProps={handleSignOut}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
