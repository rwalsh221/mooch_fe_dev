import React from 'react';
import classes from './ErrorBoundaryFallback.module.css';
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';
import Card from '../../../Layout/Card/Card';
import ButtonGreen from '../../../Button/ButtonGreen/ButtonGreen';

const ErrorBoundaryFallback = () => (
  <>
    <Header />
    <main className={classes.error_boundary}>
      <Card>
        <div className={classes.error_boundary_content}>
          <p>unfortunatly an error has occured</p>
          <ButtonGreen contentProps="sign up" />
          <ButtonGreen contentProps="sign in" />
        </div>
      </Card>
    </main>
    <Footer />
  </>
);

export default ErrorBoundaryFallback;
