import React from 'react';
import classes from './Header.module.css';

const Header = () => (
  <header className={classes.header}>
    <div data-wrapper="max-content-width">
      <h1 className={classes.heading} data-heading={'logo'}>
        MoOCH
      </h1>
    </div>
  </header>
);

export default Header;
