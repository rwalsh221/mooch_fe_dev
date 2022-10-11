import React from 'react';
import classes from './ButtonGreen.module.css';

const ButtonLogout = ({ contentProps, disabledProps, onClickProps }) => {
  return (
    <button
      className={classes.button_logout}
      disabled={disabledProps}
      onClick={onClickProps}
    >
      {contentProps}
    </button>
  );
};

export default ButtonLogout;
