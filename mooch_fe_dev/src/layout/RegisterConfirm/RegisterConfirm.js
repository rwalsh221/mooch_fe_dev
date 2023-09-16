// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import classes from './RegisterConfirm.module.css';

import SignUpContinue from './SignUpContinue/SignUpContinue';
import SignUpLink from './SignUpLink/SignUpLink';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Layout/Card/Card';
import ErrorComponent from '../../components/ErrorComponents/ErrorComponent/ErrorComponent';
import Footer from '../../components/Footer/Footer';

const RegisterConfirm = () => {
  // TODO: refactor
  const { currentUser, signOut, signUp, getCurrentUser } = useAuth();
  console.log('REENENENENENENENENENENENENENENENENENENENNE', getCurrentUser());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPreviewState, setUserPreviewAState] = useState(null);
  const [signUpComplete, setSignUpComplete] = useState(false);

  const formSubmitted = useLocation();
  console.log(formSubmitted);

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
        console.log('SIGNOUT CURREnt');
        await signOut();
        console.log(currentUser);
      }

      const newUser = await signUp(localStorage.email, localStorage.password); // get from local storage
      console.log('SIGNUP', newUser, currentUser);
      return newUser.uid;
    } catch (error) {
      console.log(error.message);
      // setError(true);
    }
  };

  const moochAPISignUP = async (uid, localStorage) => {
    console.log('MOOCHCHCHC', getCurrentUser());
    try {
      const completeSignUpBody = {
        uid,
        ...localStorage,
      };

      await fetch(`${process.env.REACT_APP_MOOCH_API_URL}/athete/register/`, {
        method: 'POST',
        body: JSON.stringify(completeSignUpBody),
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const registerHandler = async () => {
    const moochLocalStorage = JSON.parse(localStorage.getItem('moochSignUP'));
    let firebaseUid;
    console.log('regis', currentUser);
    try {
      setLoading(true);
      firebaseUid = await fireBaseSignUp(moochLocalStorage);

      if ((await moochAPISignUP(firebaseUid, moochLocalStorage)) === false) {
        throw new Error();
      }

      setSignUpComplete(true);
      setLoading(false);
    } catch (error) {
      console.log(getCurrentUser());
      console.log(
        'REGISTER HANDLER CATCH *****************************************************************************************************',
        currentUser
      );
      console.log(currentUser?.uid, firebaseUid);
      // if (firebaseUid) {
      //   console.log('HEHHEHEHEHEHEHELLLLOPOPPOPPOPO');
      //   currentUser
      //     .delete()
      //     .then(() => {
      //       console.log('user deleted');
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }
      setError(true);
      setLoading(false);
      console.error(error.message);
    }
  };

  const setProfileCardContent = (userState, loadingState, errorState) => {
    console.log('SETCARD', currentUser);
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
        <SignUpLink
          userStateProps={userState}
          setErrorProps={setError}
          setSignUpCompleteProps={setSignUpComplete}
          setLoadingProps={setLoading}
          currentUserProps={currentUser}
          registerHandlerProps={registerHandler}
        />
      );
    }
    return <SignUpContinue userStateProps={userState} />;
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
            setProfileCardContent(userPreviewState, loading, error)
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
