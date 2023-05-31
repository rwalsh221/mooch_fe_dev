import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Card from '../../components/Layout/Card/Card';
import ErrorComponent from '../../components/ErrorComponents/ErrorComponent/ErrorComponent';
import Footer from '../../components/Footer/Footer';

import { useAuth } from '../../contexts/AuthContext';

const RegisterConfirm = () => {
  //TODO: remove error from user preview state
  //TODO: bring in firebase sign up from signup
  //TODO: maybe error handler func

  console.log('RENDERREGCONFIRM');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPreviewState, setUserPreviewAState] = useState({
    loading: true,
  });

  const { signUp, currentUser, checkEmail } = useAuth();
  const navigate = useNavigate();

  const getUserPreview = useCallback(async () => {
    let moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));
    console.log(moochLocalStorage);

    try {
      if (moochLocalStorage === null) {
        console.log('mooch locoal storage null');
        throw new Error('Error');
      }

      const getUser = await fetch(
        'https://www.strava.com/api/v3/athlete?access_token=f5ea5be9623d6f84364ed7f5b183cdc55eb182c1'
      );

      if (getUser.status !== 200) {
        throw new Error('Error');
      }

      const getUserResponse = await getUser.json();

      const userImg = getUserResponse.profile_medium;
      const userFirstName = getUserResponse.firstname;
      const userLastName = getUserResponse.lastname;

      const userPreview = { userImg, userFirstName, userLastName };
      setLoading(false);
      setUserPreviewAState({ ...userPreview });
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUserPreview();
  }, [getUserPreview]);

  const fireBaseSignUp = async (e) => {
    // setLoading(true);

    try {
      // await signUp(emailRef.current.value, passwordRef.current.value); get from local storage
      return true;
    } catch (error) {
      if (error.name === 'FirebaseError') {
        // errorHandler(setError, setLoading, 'Failed to create an account');
        setError(true);
      } else {
        // errorHandler(setError, setLoading, error.message);
        setError(true);
      }
    }
  };

  const moochAPISignUP = async (uid) => {
    try {
      let moochLocalStorage = localStorage.getItem('moochSignUP');
      const completeSignUpBody = {
        userId: currentUser.uid,
        ...JSON.parse(moochLocalStorage),
      };

      // const completeMoochApiAthleteReg = await fetch(
      //   `${process.env.REACT_APP_MOOCH_API_URL}/athlete/register/`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(completeSignUpBody),
      //   }
      // );

      const completeMoochApiAthleteReg = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/test/register/`,
        {
          method: 'POST',
          body: JSON.stringify(completeSignUpBody),
        }
      );

      // const completeSignUpJson = await completeSignUp.text();
      // console.log(completeSignUpJson);
      console.log(completeMoochApiAthleteReg.status);
      // navigate('/dashboard');
    } catch (error) {}
  };

  // moochAPISignUP();

  const nRegisterHandler = async () => {
    try {
      const completeFirebaseSignUp = await fireBaseSignUp();
      const completeMoochApiSignUp = await moochAPISignUP();

      if (!completeFirebaseSignUp && !completeMoochApiSignUp) {
        throw new Error('signup error');
      }
    } catch (error) {
      console.error(error.message);
    }

    // const completeFirebaseSignup = await fireBaseSignUp();

    // if (completeFirebaseSignup) {
    // } else {
    //   throw new Error('sign up error');
    // }
  };

  nRegisterHandler();

  // NEED TO CHMAGE AD NO LONGER SEND REQUEST TO STRAVA FOR NEW ACCESS CODE
  const registerHandler = async () => {
    // 1 get code param from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    // 2, get local stored sign up data
    let moochLocalStorage = localStorage.getItem('moochSignUP');
    const signUpData = { ...JSON.parse(moochLocalStorage), authCode };
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

    // ABOVE NO LONGER NEEDED AS WAS USED TO EXCHANGE STRAVA AUTH TOKEN FOR READ_ALL
    const completeSignUpBody = {
      ...submitSignUpResponse,
      userId: currentUser.uid,
      ...JSON.parse(moochLocalStorage),
    };

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

  const setProfileCardContent = (userState, loadingState, errorState) => {
    if (loadingState) {
      return <Card>'LOADING SPINNER'</Card>;
    } else if (errorState) {
      return <ErrorComponent errorMessageProps={'SIGNUP ERROR'} />;
    } else {
      return (
        <Card>
          <div className={classes.profile_img_container}>
            <img src={userState.userImg} alt="user profile"></img>
          </div>
          <div className={classes.confirm_card_container}>
            <p>
              <span>{userState.userFirstName}</span>&nbsp;
              <span>{userState.userLastName}</span>
            </p>
            <p>
              Ready to link&nbsp;
              <span data-heading={'logo-small'}>MoOCH</span>&nbsp;&amp;&nbsp;
              <span className={classes.strava}>STRAVA</span>
            </p>
            <p>please complete your account setup</p>
            <div className={classes.confirm_card_btn_container}>
              <ButtonGreen
                contentProps={'Complete'}
                onClickProps={registerHandler}
              />
              <ButtonGreen
                contentProps={'Cancel'}
                onClickProps={() => {
                  navigate('/');
                }}
              />
            </div>
          </div>
        </Card>
      );
    }
  };

  // const profileCardContent = setProfileCardContent(userPreviewState);

  return (
    <>
      <Header />
      <main
        className={classes.register_confirm}
        data-wrapper="max-content-width"
      >
        <div className={classes.register_confirm_container}>
          {setProfileCardContent(userPreviewState, loading, error)}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterConfirm;
