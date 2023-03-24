import React from 'react';
import classes from './ErrorComponent.module.css';

import { useNavigate } from 'react-router-dom';
import Card from '../Layout/Card/Card';
import ButtonGreen from '../Button/ButtonGreen/ButtonGreen';

const ErrorComponent = ({ errorMessageProps }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className={classes.error_component}>
        <p>{errorMessageProps}</p>
        <ButtonGreen
          contentProps={'Return Home'}
          onClickProps={() => navigate('/')}
        ></ButtonGreen>
      </div>
    </Card>
  );
};

export default ErrorComponent;
