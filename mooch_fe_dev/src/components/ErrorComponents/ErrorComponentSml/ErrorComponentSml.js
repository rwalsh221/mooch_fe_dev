import React from 'react';
import PropTypes from 'prop-types';
import classes from './ErrorComponentSml.module.css';

const ErrorComponentSml = ({ errorMessageProps }) => (
  <div className={classes.error_component}>
    <p>{errorMessageProps}</p>
  </div>
);

ErrorComponentSml.propTypes = {
  errorMessageProps: PropTypes.string.isRequired,
};

export default ErrorComponentSml;
