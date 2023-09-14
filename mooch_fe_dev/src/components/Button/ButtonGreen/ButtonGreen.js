import React from 'react';
import PropTypes from 'prop-types';
import classes from './ButtonGreen.module.css';

const ButtonGreen = ({
  contentProps,
  disabledProps,
  onClickProps,
  btnTypeProps,
}) => (
  <button
    className={classes.button_green}
    disabled={disabledProps}
    onClick={onClickProps}
    // type={typeProps ? typeProps : 'button'}
    type={btnTypeProps}
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
  btnTypeProps: PropTypes.string.isRequired,
  // typeProps: PropTypes.string,
};

export default ButtonGreen;
