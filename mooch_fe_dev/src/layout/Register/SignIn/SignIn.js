import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import classes from '../Register.module.css';

import { useAuth } from '../../../contexts/AuthContext';
import SignInValidation from '../../../helpers/validation/SignInValidation';
import errorHandler from '../../../helpers/errorHandlers';
import Input from '../../../components/Form/Input/Input';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import ErrorComponentSml from '../../../components/ErrorComponents/ErrorComponentSml/ErrorComponentSml';

const SignIn = ({ formContentHandlerProps }) => {
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();
  const { signIn } = useAuth();
  const [validationError, setValidationError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = new SignInValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validateInput = validate.validateInputHandler(
      signInEmailRef,
      signInPasswordRef
    );

    if (validateInput.validatedInputs) {
      try {
        await signIn(
          signInEmailRef.current.value,
          signInPasswordRef.current.value
        );
        navigate('/dashboard');
      } catch (error) {
        errorHandler(setError, setLoading, 'failed to sign in');
        console.error(error.message);
      }
    } else {
      errorHandler(setValidationError, setLoading, validateInput.errorObj);
    }
  };

  return (
    <>
      <h3 className={classes.register_card__heading}>
        Login to Your MoOch Account
      </h3>
      <form
        className={classes.sign_in_form}
        data-margin-bottom="300"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          inputTypeProps="email"
          inputIdProps="signin-email"
          inputAriaLabelProps="sign in email"
          inputNameProps="signin-email"
          inputPlaceholderProps="email"
          inputRefProps={signInEmailRef}
          validationErrorProps={validationError}
          autoCompleteProps="username"
        />
        <br />
        <Input
          inputTypeProps="password"
          inputIdProps="signin-password"
          inputAriaLabelProps="sign in password"
          inputNameProps="signin-password"
          inputPlaceholderProps="password"
          inputRefProps={signInPasswordRef}
          validationErrorProps={validationError}
          autoCompleteProps="current-password"
        />
        <div className={classes.form_btn_container}>
          <ButtonGreen
            contentProps="login"
            disabledProps={loading}
            btnTypeProps="submit"
          />
          {error && <ErrorComponentSml errorMessageProps={error} />}
        </div>
      </form>
      <p>
        Need an account? Sign Up&nbsp;
        <span
          onClick={formContentHandlerProps}
          className={classes.form_change}
          aria-hidden
        >
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

SignIn.propTypes = {
  formContentHandlerProps: PropTypes.func.isRequired,
};

export default SignIn;
