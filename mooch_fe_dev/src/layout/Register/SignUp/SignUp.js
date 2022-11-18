import React, { useRef, useState } from 'react';
import classes from '../Register.module.css';

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponet';

const SignUp = ({ formContentHandlerProps, needHelpHandlerProps }) => {
  // TODO: replace localstorage with session storage
  // TODO: redirect to link wit starva after succedsfull firbase sign up
  // TODO: add error component from sign in. need to make a new error component
  // TODO: create input componet
  // TODO: test
  // TODO: ADD FORM VALIDATION
  // TODO: FORM REF OR STATE
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const clientIdRef = useRef();
  const clientSecretRef = useRef();
  const accessTokenRef = useRef();
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailTest = 'test@test.com';
  sessionStorage.setItem('email', emailTest);

  const setSignUpLocalStorage = () => {
    const data = {
      email: emailRef.current.value,
      clientId: clientIdRef.current.value,
      clientSecret: clientSecretRef.current.value,
      accessToken: accessTokenRef.current.value,
    };

    localStorage.setItem('moochSignUP', JSON.stringify(data));
    console.log(localStorage);
  };

  const clearForm = (...refs) => {
    refs.forEach((el) => {
      el.current.value = '';
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        clearForm(passwordRef, passwordConfirmRef);
        throw new Error('Passwords do not match');
      }

      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      setSignUpLocalStorage();
      navigate('/register-confirm');
    } catch (error) {
      if (error.name === 'FirebaseError') {
        setError('Failed to create an account');
      }
      setError(error.message);

      setTimeout(() => {
        setError('');
      }, 5000);
    }
    setLoading(false);
  };

  // SIGN UP CODE ABOVE NEEDS TO MOVE TO REGISTER CONFIRM

  // handleSubmit2();

  console.log(error);
  return (
    <>
      <h3 className={classes.register_card__heading}>
        Create your MoOCH Account
      </h3>

      <form onSubmit={handleSubmit}>
        <h4>User Account Information</h4>
        <input
          type="email"
          id="register-email"
          aria-label="register email"
          name="register-email"
          placeholder="Email"
          required
          ref={emailRef}
        />
        <br />
        <input
          type="password"
          id="register-password"
          aria-label="password"
          name="register-password"
          placeholder="Password"
          autoComplete="new-password"
          required
          ref={passwordRef}
        />
        <input
          type="password"
          id="register-password-confirm"
          aria-label="confirm password"
          name="register-password-confirm"
          placeholder="Confirm"
          required
          ref={passwordConfirmRef}
        />
        <h4>Strava Api Application Keys</h4>
        <input
          placeholder="Client ID"
          aria-label="Client id"
          name="register-client-id"
          required
          ref={clientIdRef}
        />
        <input
          placeholder="Client Secret"
          aria-label="Client Secret"
          name="register-client-secret"
          required
          ref={clientSecretRef}
        />
        <br />
        <input
          placeholder="Your Access Token"
          aria-label="Your Access Token"
          name="register-access-token"
          required
          ref={accessTokenRef}
        />
        <div className={classes.form_btn_container}>
          <ButtonGreen contentProps={'sign up'} disabledProps={loading} />
          {error && <ErrorComponent errorMessageProps={error} />}
        </div>
      </form>
      <p>
        Have an account? Sign In&nbsp;
        <span onClick={formContentHandlerProps} className={classes.form_change}>
          here
        </span>
      </p>
      <button className={classes.help_btn} onClick={needHelpHandlerProps}>
        Need Help Signing Up?
      </button>
    </>
  );
};
export default SignUp;
