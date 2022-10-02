import React from 'react';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Card from '../../components/Layout/Card/Card';
import Footer from '../../components/Footer/Footer';

const RegisterConfirm = () => {
  const emailTest = 'test@test.com';

  const registerHandler = async () => {
    // 1 get code param from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    // 2, get local stored sign up data
    const signUpData = localStorage.getItem('moochSignUp');
    // 3, send sign up data to mooch back end
    const submitSignUp = await fetch('', {
      method: 'POST',
      data: signUpData,
    });
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
              <ButtonGreen
                contentProps={'Complete Sign Up'}
                onClickProps={registerHandler}
              />
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterConfirm;
