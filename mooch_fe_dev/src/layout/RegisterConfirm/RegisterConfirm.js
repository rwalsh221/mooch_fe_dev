import React from 'react';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Card from '../../components/Layout/Card/Card';
import Footer from '../../components/Footer/Footer';

const RegisterConfirm = () => {
  const emailTest = 'test@test.com';

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
              <h2
                className={classes.register_card__logo}
                data-heading={'logo-small'}
              >
                MoOCH &amp; <span className={classes.strava}>STRAVA</span>
                account link complete
              </h2>
              <p>{emailTest}&nbsp;Please Complete your account setup</p>
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
