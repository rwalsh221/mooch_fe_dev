// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Layout/Card/Card';
import ErrorComponent from '../../components/ErrorComponents/ErrorComponent/ErrorComponent';
import Footer from '../../components/Footer/Footer';

import { useAuth } from '../../contexts/AuthContext';

const RegisterConfirm = () => {
  // TODO: maybe error handler func

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPreviewState, setUserPreviewAState] = useState(null);
  const [signUpComplete, setSignUpComplete] = useState(false);

  const { currentUser, signUp, signOut } = useAuth();
  const navigate = useNavigate();

  // const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));
  useEffect(() => {
    const getUserPreview = async () => {
      const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));

      try {
        if (moochLocalStorage === null) {
          throw new Error('Error');
        }

        const getUser = await fetch(
          `https://www.strava.com/api/v3/athlete?access_token=${moochLocalStorage.accessToken}`
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
    };
    getUserPreview();
  }, []);

  const fireBaseSignUp = async (localStorage) => {
    try {
      if (currentUser) {
        await signOut();
      }

      const newUser = await signUp(localStorage.email, localStorage.password); // get from local storage

      return newUser.uid;
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  const moochAPISignUP = async (uid, localStorage) => {
    try {
      const completeSignUpBody = {
        uid,
        ...localStorage,
      };

      await fetch(`${process.env.REACT_APP_MOOCH_API_URL}/test/register/`, {
        method: 'POST',
        body: JSON.stringify(completeSignUpBody),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const registerHandler = async () => {
    const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));

    try {
      setLoading(true);
      const firebaseUid = await fireBaseSignUp(moochLocalStorage);

      await moochAPISignUP(firebaseUid, moochLocalStorage);

      setSignUpComplete(true);
      setLoading(false);
    } catch (error) {
      console.log('CATCH ERROR');
      console.error(error.message);
    }
  };

  const setProfileCardContent = (userState, loadingState, errorState) => {
    if (loadingState) {
      return (
        <Card>
          <Spinner />
        </Card>
      );
    }

    if (errorState) {
      return <ErrorComponent errorMessageProps="SIGNUP ERROR" />;
    }

    if (signUpComplete === false) {
      return (
        <Card>
          <div className={classes.profile_img_container}>
            <img src={userState.userImg} alt="user profile" />
          </div>
          <div className={classes.confirm_card_container}>
            <p>
              <span>{userState.userFirstName}</span>&nbsp;
              <span>{userState.userLastName}</span>
            </p>
            <p>
              Ready to link&nbsp;
              <span data-heading="logo-small">MoOCH</span>&nbsp;&amp;&nbsp;
              <span className={classes.strava}>STRAVA</span>
            </p>
            <p>please complete your account setup</p>
            <div className={classes.confirm_card_btn_container}>
              <ButtonGreen
                contentProps="Complete"
                onClickProps={async () => {
                  await registerHandler();
                }}
              />
              <ButtonGreen
                contentProps="Cancel"
                onClickProps={() => {
                  navigate('/');
                }}
              />
            </div>
          </div>
        </Card>
      );
    }
    return (
      <Card>
        <div className={classes.profile_img_container}>
          <img src={userState.userImg} alt="user profile" />
        </div>
        <div className={classes.confirm_card_container}>
          <p>
            <span>{userState.userFirstName}</span>&nbsp;
            <span>{userState.userLastName}</span>
          </p>
          <p>
            <span data-heading="logo-small">MoOCH</span>&nbsp;&amp;&nbsp;
            <span className={classes.strava}>STRAVA</span>&nbsp; link Complete
          </p>
          <p>please continue to your dashboard</p>
          <div className={classes.confirm_card_btn_container}>
            <ButtonGreen
              contentProps="Complete"
              onClickProps={() => {
                navigate('/dashboard');
              }}
            />
          </div>
        </div>
      </Card>
    );
  };

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
