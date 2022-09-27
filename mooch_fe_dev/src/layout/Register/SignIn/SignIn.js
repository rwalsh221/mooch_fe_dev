import React from 'react';
import classes from '../Register.module.css';

import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';

const SignIn = ({ formContentHandlerProps }) => {
  return (
    <>
      <h3 className={classes.register_card__heading}>
        Login to Your MoOch Accout
      </h3>
      <form action="post" data-margin-bottom={'300'}>
        <input
          type="email"
          id="register-email"
          aria-label="register email"
          name="register-email"
          placeholder="Email"
          // autoComplete="new-password"
        />
        <br />
        <input
          type="password"
          id="register-password"
          aria-label="password"
          name="register-password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <br />
        <ButtonGreen contentProps={'login'} />
      </form>
      <p>
        Need an account? Sign Up&nbsp;
        <span onClick={formContentHandlerProps} className={classes.form_change}>
          here
        </span>
      </p>
    </>
  );
};

export default SignIn;
