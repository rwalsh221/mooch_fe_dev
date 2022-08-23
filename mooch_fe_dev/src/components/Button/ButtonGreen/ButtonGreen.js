import React from 'react';
import classes from './ButtonGreen.module.css';

const ButtonGreen = ({ contentProps }) => {
  return <button className={classes.button_green}>{contentProps}</button>;
};

export default ButtonGreen;
