import React from 'react';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Card from '../../components/Layout/Card/Card';
import Footer from '../../components/Footer/Footer';

import { useAuth } from '../../contexts/AuthContext';

const RegisterConfirm = () => {
  const emailTest = 'test@test.com';
  const { signUp, currentUser } = useAuth();

  const registerHandler = async () => {
    // 1 get code param from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    // 2, get local stored sign up data
    let moochLocalStorage = localStorage.getItem('moochSignUP');
    const signUpData = { ...JSON.parse(moochLocalStorage), authCode };
    console.log(signUpData);
    // const test:
    // 3, send sign up data to mooch back end
    const submitSignUp = await fetch(
      'http://localhost/mooch_be_dev/athlete/register/registerAuth/',
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        // authCode,
      }
    );
    // console.log(JSON.parse(signUpData));
    // console.log(authCode);
    // console.log(localStorage);
    const submitSignUpResponse = await submitSignUp.json();
    console.log(submitSignUpResponse);
    const completeSignUpBody = {
      ...submitSignUpResponse,
      userId: currentUser.uid,
    };
    console.log(completeSignUpBody);
    const completeSignUp = await fetch(
      'http://localhost/mooch_be_dev/athlete/register/',
      {
        method: 'POST',
        body: JSON.stringify(completeSignUpBody),
      }
    );

    const completeSignUpJson = await completeSignUp.json();
    console.log(completeSignUpJson);
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
              <p>{currentUser.email}&nbsp;please complete your account setup</p>
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
