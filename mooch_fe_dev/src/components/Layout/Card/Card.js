import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, widthProps, marginProps }) => {
  return (
    <div
      style={{ width: widthProps, margin: marginProps }}
      className={classes.card}
    >
      {children}
    </div>
  );
};

export default Card;
