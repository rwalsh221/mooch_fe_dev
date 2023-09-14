import React from 'react';
import PropTypes from 'prop-types';
import classes from '../Typography.module.css';

const MoochLogo = ({ logoSizeProps }) => (
  <p
    className={`${classes.mooch_logo} ${
      classes[`mooch_logo_${logoSizeProps}`]
    }`}
  >
    MoOCH
  </p>
);

MoochLogo.defaultProps = {
  logoSizeProps: 'default',
};

MoochLogo.propTypes = {
  logoSizeProps: PropTypes.string,
};

export default MoochLogo;
