import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ErrorBoundaryFallback.module.css';

import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import Card from '../../../Layout/Card/Card';
import ButtonGreen from '../../../Button/ButtonGreen/ButtonGreen';

const ErrorBoundaryFallback = () => {
  const navigate = useNavigate();

  const navigateHandler = (param) => {
    navigate(`/landing?${new URLSearchParams({ state: param })}`);
  };

  // console.log(navigate);

  return (
    <>
      <Header />
      <main className={classes.error_boundary}>
        <Card>
          <div className={classes.error_boundary_content}>
            <p>unfortunatly an error has occured</p>
            <ButtonGreen
              contentProps="sign up"
              onClickProps={() => navigateHandler('signup')}
            />
            <ButtonGreen
              contentProps="sign in"
              onClickProps={() => navigateHandler('signin')}
            />
          </div>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default ErrorBoundaryFallback;
