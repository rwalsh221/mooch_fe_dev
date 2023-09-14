import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Header.module.css';

import { useAuth } from '../../contexts/AuthContext';
import ButtonGreen from '../Button/ButtonGreen/ButtonGreen';
import MoochLogo from '../Typography/MoochLogo/MoochLogo';

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
          <h1 className={classes.heading}>
            <Link to="/">
              <MoochLogo />
            </Link>
          </h1>
          {signOutProps && (
            <ButtonGreen contentProps="Sign Out" onClickProps={handleSignOut} />
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  signOutProps: false,
};

Header.propTypes = {
  signOutProps: PropTypes.bool,
};

export default Header;
