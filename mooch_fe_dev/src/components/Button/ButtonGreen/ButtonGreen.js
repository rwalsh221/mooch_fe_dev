import React from 'react';
import classes from './ButtonGreen.module.css';

const ButtonGreen = ({ contentProps, disabledProps }) => {
  return (
    <button className={classes.button_green} disabled={disabledProps}>
      {contentProps}
    </button>
  );
};

export default ButtonGreen;
