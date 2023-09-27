import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from '../Register.module.css';

import { useAuth } from '../../../contexts/AuthContext';

import SignUpValidation from '../../../helpers/validation/SignUpValidation';
import errorHandler from '../../../helpers/errorHandlers';
import Input from '../../../components/Form/Input/Input';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';

import ErrorComponentSml from '../../../components/ErrorComponents/ErrorComponentSml/ErrorComponentSml';

const SignUp = ({ formContentHandlerProps, needHelpHandlerProps }) => {
  // TODO: replace localstorage with session storage last thing

  // TODO: Add github link to footer

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const clientIdRef = useRef();
  const clientSecretRef = useRef();
  const accessTokenRef = useRef();
  const refreshTokenRef = useRef();
  const { checkEmail } = useAuth();
  const [validationError, setValidationError] = useState(null);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = new SignUpValidation();

  const setSignUpLocalStorage = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      clientId: clientIdRef.current.value,
      clientSecret: clientSecretRef.current.value,
      accessToken: accessTokenRef.current.value,
      refreshToken: refreshTokenRef.current.value,
    };

    localStorage.setItem('moochSignUP', JSON.stringify(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validateInput = validate.validateInputHandler(
      emailRef,
      passwordRef,
      passwordConfirmRef,
      accessTokenRef,
      clientSecretRef,
      clientIdRef,
      refreshTokenRef
    );

    if (validateInput.validatedInputs) {
      try {
        const emailIsAvaliable = await checkEmail(emailRef.current.value);

        if (emailIsAvaliable.length > 0) {
          const unavailableEmailErr = new Error('email unavailable');
          unavailableEmailErr.name = 'emailUnavailable';
          throw unavailableEmailErr;
        }
        setSignUpLocalStorage();
        navigate('/register-confirm', { state: { submit: true } });
      } catch (error) {
        if (error.name === 'emailUnavailable') {
          // manually add validateInput.errorObj for email unavailable error
          errorHandler(setValidationError, setLoading, {
            inputName: 'register-email',
            error: true,
          });
          errorHandler(setError, setLoading, error.message);
        } else {
          console.error(error.name);
          console.error(error.message);
          errorHandler(setError, setLoading, error.message);
        }
      }
    } else {
      errorHandler(setValidationError, setLoading, validateInput.errorObj);
    }
  };

  return (
    <>
      <h3 className={classes.register_card__heading}>
        Create your MoOCH Account
      </h3>
      <form className={classes.sign_up_form} onSubmit={handleSubmit} noValidate>
        <h4>User Account Information</h4>
        {/* EMAIL */}
        <Input
          inputTypeProps="email"
          inputIdProps="register-email"
          inputAriaLabelProps="register-email"
          inputNameProps="register-email"
          inputPlaceholderProps="email"
          inputRefProps={emailRef}
          validationErrorProps={validationError}
          autoCompleteProps="email"
        />
        {/* PASSWORD */}
        <Input
          inputTypeProps="password"
          inputIdProps="register-password"
          inputAriaLabelProps="register-password"
          inputNameProps="register-password"
          inputPlaceholderProps="password"
          inputRefProps={passwordRef}
          validationErrorProps={validationError}
          autoCompleteProps="new-password"
        />
        {/* PASSWORD-CONFIRM */}
        <Input
          inputTypeProps="password"
          inputIdProps="register-password-confirm"
          inputAriaLabelProps="confirm password"
          inputNameProps="register-password-confirm"
          inputPlaceholderProps="confirm"
          inputRefProps={passwordConfirmRef}
          validationErrorProps={validationError}
          autoCompleteProps="new-password"
        />
        {/* STRAVA KEYS */}
        <h4>Strava Api Application Keys</h4>
        <Input
          inputTypeProps="text"
          inputIdProps="register-client-id"
          inputAriaLabelProps="client id"
          inputNameProps="register-client-id"
          inputPlaceholderProps="client ID"
          inputRefProps={clientIdRef}
          validationErrorProps={validationError}
        />
        <Input
          inputTypeProps="text"
          inputIdProps="register-client-secret"
          inputAriaLabelProps="client secret"
          inputNameProps="register-client-secret"
          inputPlaceholderProps="client secret"
          inputRefProps={clientSecretRef}
          validationErrorProps={validationError}
        />
        <Input
          inputTypeProps="text"
          inputIdProps="register-access-token"
          inputAriaLabelProps="your access token"
          inputNameProps="register-access-token"
          inputPlaceholderProps="your access token"
          inputRefProps={accessTokenRef}
          validationErrorProps={validationError}
        />
        <Input
          inputTypeProps="text"
          inputIdProps="register-refresh-token"
          inputAriaLabelProps="your refresh token"
          inputNameProps="register-refresh-token"
          inputPlaceholderProps="your refresh token"
          inputRefProps={refreshTokenRef}
          validationErrorProps={validationError}
        />
        <div className={classes.form_btn_container}>
          <ButtonGreen
            contentProps="sign up"
            disabledProps={loading}
            btnTypeProps="submit"
          />
          {error && <ErrorComponentSml errorMessageProps={error} />}
        </div>
      </form>
      <p>
        Have an account? Sign In&nbsp;
        <span
          onClick={formContentHandlerProps}
          className={classes.form_change}
          aria-hidden
        >
          here
        </span>
      </p>
      <button
        className={classes.help_btn}
        onClick={needHelpHandlerProps}
        type="button"
      >
        Need Help Signing Up?
      </button>
    </>
  );
};

SignUp.propTypes = {
  formContentHandlerProps: PropTypes.func.isRequired,
  needHelpHandlerProps: PropTypes.func.isRequired,
};
export default SignUp;
