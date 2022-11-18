import React, { useRef, useState } from 'react';
import classes from '../Register.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponet';

const SignIn = ({ formContentHandlerProps }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch (error) {
      setError('failed to sign in');
      console.error(error.message);
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 5000);
    }
  };

  return (
    <>
      <h3 className={classes.register_card__heading}>
        Login to Your MoOch Account
      </h3>
      <form data-margin-bottom={'300'} onSubmit={handleSubmit}>
        <input
          type="email"
          id="register-email"
          aria-label="register email"
          name="register-email"
          placeholder="Email"
          required
          ref={emailRef}
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
          required
          ref={passwordRef}
        />
        <br />
        <div className={classes.form_btn_container}>
          <ButtonGreen contentProps={'login'} disabledProps={loading} />
          {error && <ErrorComponent errorMessageProps={error} />}
        </div>
      </form>
      <p>
        Need an account? Sign Up&nbsp;
        <span onClick={formContentHandlerProps} className={classes.form_change}>
          here
        </span>
      </p>
      <p>
        Forgot your password? reset your password&nbsp;
        <Link to="/forgot-password">here</Link>
      </p>
    </>
  );
};

export default SignIn;
