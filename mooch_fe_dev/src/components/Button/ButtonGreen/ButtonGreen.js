import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonGreen.module.css';

const ButtonGreen = ({ contentProps, disabledProps, onClickProps }) => (
  <button
    className={classes.button_green}
    disabled={disabledProps}
    onClick={onClickProps}
    // type={typeProps ? typeProps : 'button'}
  >
    {contentProps}
  </button>
);

ButtonGreen.defaultProps = {
  disabledProps: false,
  // typeProps: 'button',
  onClickProps: null,
};

ButtonGreen.propTypes = {
  contentProps: PropTypes.string.isRequired,
  disabledProps: PropTypes.bool,
  onClickProps: PropTypes.func,
  // typeProps: PropTypes.string,
};

export default ButtonGreen;
