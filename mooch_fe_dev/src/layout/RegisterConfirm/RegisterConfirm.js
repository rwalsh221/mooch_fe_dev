import React, { useState, useEffect, useCallback } from 'react';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Layout/Card/Card';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponet';
import Footer from '../../components/Footer/Footer';

import { useAuth } from '../../contexts/AuthContext';

const RegisterConfirm = () => {
  const [userPreviewState, setUserPreviewAState] = useState({
    error: false,
    loading: true,
  });
  console.log(userPreviewState);
  // let profileCardContent = 'LOADING SPINNER';
  const getUserPreview = useCallback(async () => {
    let moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));
    console.log(moochLocalStorage);

    try {
      if (moochLocalStorage === null) {
        console.log('mooch locoal storage null');
        throw new Error('Error');
      }

      const getUser = await fetch(
        'https://www.strava.com/api/v3/athlete?access_token=a5605fb3b41265dfcc5af099553f7880f59f627a'
      );

      if (getUser.status !== 200) {
        throw new Error('Error');
      }

      const getUserResponse = await getUser.json();
      console.log(getUserResponse);
      const userPreviewStateCopy = {};

      userPreviewStateCopy.img = getUserResponse.profile_medium;
      userPreviewStateCopy.firstName = getUserResponse.firstname;
      userPreviewStateCopy.lastName = getUserResponse.lastname;
      userPreviewStateCopy.loading = false;

      setUserPreviewAState({ ...userPreviewStateCopy });
    } catch (error) {
      const userPreviewStateCopy = {};
      userPreviewStateCopy.error = true;
      userPreviewStateCopy.loading = false;

      setUserPreviewAState({ ...userPreviewStateCopy });
      console.error(error);
    }
  }, []);

  // getUserPreview();

  useEffect(() => {
    getUserPreview();
  }, [getUserPreview]);

  const { currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();

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
      `${process.env.REACT_APP_MOOCH_API_URL}/athlete/register/registerAuth/`,
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        // authCode,
      }
    );

    const submitSignUpResponse = await submitSignUp.json();
    console.log(submitSignUpResponse);
    const completeSignUpBody = {
      ...submitSignUpResponse,
      userId: currentUser.uid,
      ...JSON.parse(moochLocalStorage),
    };
    console.log(completeSignUpBody);
    const completeSignUp = await fetch(
      `${process.env.REACT_APP_MOOCH_API_URL}/athlete/register/`,
      {
        method: 'POST',
        body: JSON.stringify(completeSignUpBody),
      }
    );

    const completeSignUpJson = await completeSignUp.text();
    console.log(completeSignUpJson);
    navigate('/dashboard');
  };

  const setProfileCardContent = (state) => {
    console.log(state);
    if (state.loading) {
      return <Card>'LOADING SPINNER'</Card>;
    } else if (state.error) {
      return <ErrorComponent errorMessageProps={'SIGNUP ERROR'} />;
    } else {
      return (
        <Card>
          <div className={classes.profile_img_container}>
            <img src={userPreviewState.img} alt="user profile"></img>
          </div>
          <div className={classes.confirm_card_container}>
            <p>
              Ready to link&nbsp;
              <span data-heading={'logo-small'}>MoOCH</span>&nbsp;&amp;&nbsp;
              <span className={classes.strava}>STRAVA</span>
            </p>
            <p>
              {userPreviewState.firstName} {userPreviewState.lastName} please
              complete your account setup
            </p>
            <ButtonGreen
              contentProps={'Complete Sign Up'}
              onClickProps={registerHandler}
            />
          </div>
        </Card>
      );
    }
  };

  const profileCardContent = setProfileCardContent(userPreviewState);

  return (
    <>
      <Header />
      <main
        className={classes.register_confirm}
        data-wrapper="max-content-width"
      >
        <div className={classes.register_confirm_container}>
          {/* <Card
            widthProps={'25%'}
            marginProps={'var(--margin-100) 0'}
            className={classes.user_preview_card}
          >
            {profileCardContent}
          </Card> */}
          {profileCardContent}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterConfirm;
