import React from 'react';
import classes from './ErrorComponentSml.module.css';

const ErrorComponentSml = ({ errorMessageProps }) => {
  return (
    <div className={classes.error_component}>
      <p>{errorMessageProps}</p>
    </div>
  );
};
export default ErrorComponentSml;
