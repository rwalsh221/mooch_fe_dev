import React, { useRef, useState } from 'react';
import classes from '../Register.module.css';

import { useNavigate } from 'react-router-dom';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import { useAuth } from '../../../contexts/AuthContext';

const SignUp = ({ formContentHandlerProps }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      signUp(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account');
      console.error(error.message);
    }
    setLoading(false);
  };

  console.log(error);
  return (
    <>
      <h3 className={classes.register_card__heading}>
        Create your MoOCH Account
      </h3>
      <p>{error}</p>
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
        <br />
        <ButtonGreen contentProps={'sign up'} disabledProps={loading} />
      </form>
      <p>
        Have an account? Sign In&nbsp;
        <span onClick={formContentHandlerProps} className={classes.form_change}>
          here
        </span>
      </p>
    </>
  );
};
export default SignUp;
