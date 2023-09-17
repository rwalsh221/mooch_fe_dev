// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import SignUpContinue from './SignUpContinue/SignUpContinue';
import SignUpFirebase from './SignUpFirebase/SignUpFirebase';
import SignUpLink from './SignUpLink/SignUpLink';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Layout/Card/Card';
import ErrorComponent from '../../components/ErrorComponents/ErrorComponent/ErrorComponent';
import Footer from '../../components/Footer/Footer';

const RegisterConfirm = () => {
  // TODO: refactor
  const { currentUser, signOut, signUp } = useAuth();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPreviewState, setUserPreviewAState] = useState(null);
  const [signUpComplete, setSignUpComplete] = useState({
    firebase: false,
    moochApi: false,
  });

  const formSubmitted = useLocation();

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

  const fireBaseSignUp = async () => {
    const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));
    try {
      setLoading(true);
      if (currentUser) {
        await signOut();
      }

      await signUp(moochLocalStorage.email, moochLocalStorage.password); // get from local storage

      setSignUpComplete({ ...signUpComplete, firebase: true });

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(true);
      setLoading(false);
    }
  };

  const moochAPISignUP = async () => {
    const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));

    try {
      setLoading(true);
      if (!currentUser) {
        throw new Error();
      }

      const completeSignUpBody = {
        uid: currentUser.uid,
        ...moochLocalStorage,
      };

      await fetch(`${process.env.REACT_APP_MOOCH_API_URL}/athlete/register/`, {
        method: 'POST',
        body: JSON.stringify(completeSignUpBody),
      });
      setSignUpComplete({ ...signUpComplete, moochApi: true });
      setLoading(false);
    } catch (error) {
      console.error(error);
      await currentUser.delete();
      setError(true);
      setLoading(false);
      return false;
    }
  };

  const setProfileCardContent = () => {
    if (loading) {
      return (
        <Card>
          <Spinner />
        </Card>
      );
    }

    if (error) {
      return <ErrorComponent errorMessageProps="SIGNUP ERROR" />;
    }

    if (signUpComplete.firebase === false) {
      return (
        <SignUpFirebase
          userStateProps={userPreviewState}
          fireBaseSignUpProps={fireBaseSignUp}
        />
      );
    }

    if (signUpComplete.moochApi === false) {
      return (
        <SignUpLink
          userStateProps={userPreviewState}
          registerMoochApiProps={moochAPISignUP}
          currentUserProps={currentUser}
        />
      );
    }
    return <SignUpContinue userStateProps={userPreviewState} />;
  };

  return (
    <>
      <Header />
      <main
        className={classes.register_confirm}
        data-wrapper="max-content-width"
      >
        <div className={classes.register_confirm_container}>
          {formSubmitted.state?.submit ? (
            setProfileCardContent()
          ) : (
            <Navigate to="/" />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterConfirm;
