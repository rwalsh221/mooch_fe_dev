import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './ErrorComponent.module.css';

import Card from '../../Layout/Card/Card';
import ButtonGreen from '../../Button/ButtonGreen/ButtonGreen';

const ErrorComponent = ({ errorMessageProps }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className={classes.error_component}>
        <p>{errorMessageProps}</p>
        <ButtonGreen
          contentProps="Return Home"
          onClickProps={() => navigate('/')}
        />
      </div>
    </Card>
  );
};

ErrorComponent.propTypes = {
  errorMessageProps: PropTypes.string.isRequired,
};

export default ErrorComponent;
