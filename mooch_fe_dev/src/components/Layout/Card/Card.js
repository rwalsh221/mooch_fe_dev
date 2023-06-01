import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.module.css';

const Card = ({ children, widthProps, marginProps }) => (
  <div
    style={{ width: widthProps, margin: marginProps }}
    className={classes.card}
  >
    {children}
  </div>
);

Card.defaultProps = {
  widthProps: null,
  marginProps: null,
};

Card.propTypes = {
  widthProps: PropTypes.string,
  marginProps: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
