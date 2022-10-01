import React from 'react';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Card from '../../components/Layout/Card/Card';
import Footer from '../../components/Footer/Footer';

const RegisterConfirm = () => {
  const emailTest = 'test@test.com';

  const registerHandler = () => {
    // send user info to mooch back end
  };

  return (
    <>
      <Header />
      <main
        className={classes.register_confirm}
        data-wrapper="max-content-width"
      >
        <div className={classes.register_confirm_container}>
          <Card>
            <div className={classes.confirm_card_container}>
              <p>
                <span data-heading={'logo-small'}>MoOCH</span>&nbsp;&amp;&nbsp;
                <span className={classes.strava}>STRAVA</span>&nbsp; account
                link complete
              </p>
              <p>{emailTest}&nbsp;please complete your account setup</p>
              <ButtonGreen contentProps={'Complete Sign Up'} />
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterConfirm;
