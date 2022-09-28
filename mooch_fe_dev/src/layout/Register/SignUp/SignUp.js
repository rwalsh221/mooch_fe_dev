import React, { useRef } from 'react';
import classes from '../Register.module.css';

import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import { useAuth } from '../../../contexts/AuthContext';

const SignUp = ({ formContentHandlerProps }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <h3 className={classes.register_card__heading}>
        Create your MoOCH Account
      </h3>
      <form action="post" data-margin-bottom={'300'}>
        {/* <label for="sign-up-email">email</label> */}
        <input
          type="email"
          id="register-email"
          aria-label="register email"
          name="register-email"
          placeholder="Email"
          ref={emailRef}
          // autoComplete="new-password"
        />
        <br />
        {/* <label for="sign-up-strava-id">strava id</label> */}
        <input
          // type="number"
          id="register-strava-id"
          aria-label="strava id"
          name="register-strava-id"
          placeholder="Strava id"
          // autoComplete="new-password"
        />
        <br />
        {/* <label for="sign-up-password">password</label> */}
        <input
          type="password"
          id="register-password"
          aria-label="password"
          name="register-password"
          placeholder="Password"
          autoComplete="new-password"
          ref={passwordRef}
        />

        {/* <label for="sign-up-password-confirm">confirm password</label> */}
        <input
          type="password"
          id="register-password-confirm"
          aria-label="confirm password"
          name="register-password-confirm"
          placeholder="Confirm"
          // autoComplete="new-password"
          ref={passwordConfirmRef}
        />
        <br />
        <ButtonGreen contentProps={'sign up'} />
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
