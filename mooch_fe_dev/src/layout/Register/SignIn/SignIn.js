import React, { useRef, useState } from 'react';
import classes from '../Register.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../components/Form/Input/Input';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import ErrorComponent from '../../../components/ErrorComponents/ErrorComponent/ErrorComponent';
import ErrorComponentSml from '../../../components/ErrorComponents/ErrorComponentSml/ErrorComponentSml';

const SignIn = ({ formContentHandlerProps }) => {
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();
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
      await signIn(
        signInEmailRef.current.value,
        signInPasswordRef.current.value
      );
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
      <form
        className={classes.sign_in_form}
        data-margin-bottom={'300'}
        onSubmit={handleSubmit}
      >
        <Input
          inputTypeProps={'email'}
          inputIdProps={'signin-email'}
          inputAriaLabelProps={'sign in email'}
          inputNameProps={'signin-email'}
          inputPlaceholderProps={'email'}
          inputRefProps={signInEmailRef}
        />
        <br />
        <Input
          inputTypeProps={'password'}
          inputIdProps={'signin-password'}
          inputAriaLabelProps={'sign in password'}
          inputNameProps={'signin-password'}
          inputPlaceholderProps={'password'}
          inputRefProps={signInPasswordRef}
        />
        <div className={classes.form_btn_container}>
          <ButtonGreen contentProps={'login'} disabledProps={loading} />
          {error && <ErrorComponentSml errorMessageProps={error} />}
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
