import React from 'react';
import classes from './ErrorComponent.module.css';

const ErrorComponent = ({ errorMessageProps }) => (
  <p className={classes.error_component}>{errorMessageProps}</p>
);

export default ErrorComponent;
