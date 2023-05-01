import React, { useRef, useState } from 'react';
import classes from '../Register.module.css';

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignUpValidation } from '../../../helpers/validation';
import Input from '../../../components/Form/Input/Input';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import ErrorComponent from '../../../components/ErrorComponents/ErrorComponent/ErrorComponent';

const SignUp = ({ formContentHandlerProps, needHelpHandlerProps }) => {
  // TODO: replace localstorage with session storage last thing
  // TODO: 1, set session storage with strava data, 2, signup to firebase, 3, redirect reg confirm to set mooch db with starva data,FAIL rdiect to error compnent

  // TODO:  need to make a new error component - for dashboard access when not signed in. error boundray WDS

  // TODO: Add github link to footer

  // TODO: test
  // TODO: ADD FORM VALIDATION and add error component from sign in to signup.
  // TODO: FORM REF OR STATE

  // TODO: eslint

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const clientIdRef = useRef();
  const clientSecretRef = useRef();
  const accessTokenRef = useRef();
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [emailState, setEmailState] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailTest = 'test@test.com';
  sessionStorage.setItem('email', emailTest);

  const validate = new SignUpValidation();

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

  const errorHandler = (state, stateContent) => {
    state(stateContent);

    setTimeout(() => {
      setLoading(false);
      setError('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateInput = validate.validateInputHandler(
      emailRef,
      passwordRef,
      passwordConfirmRef,
      clientIdRef,
      clientSecretRef,
      accessTokenRef
    );

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
      <form className={classes.sign_up_form} onSubmit={handleSubmit}>
        <h4>User Account Information</h4>
        {/* EMAIL */}
        <Input
          inputTypeProps={'email'}
          inputIdProps={'register-email'}
          inputAriaLabelProps={'register-email'}
          inputNameProps={'register-email'}
          inputPlaceholderProps={'email'}
          inputRefProps={emailRef}
          inputStateProps={emailState}
          updateStateProps={setEmailState}
        />
        {/* PASSWORD */}
        <Input
          inputTypeProps={'password'}
          inputIdProps={'register-password'}
          inputAriaLabelProps={'register-password'}
          inputNameProps={'register-password'}
          inputPlaceholderProps={'password'}
          inputRefProps={passwordRef}
        />
        {/* PASSWORD-CONFIRM */}
        <Input
          inputTypeProps={'password'}
          inputIdProps={'register-password-confirm'}
          inputAriaLabelProps={'confirm password'}
          inputNameProps={'register-password-confirm'}
          inputPlaceholderProps={'confirm'}
          inputRefProps={passwordConfirmRef}
        />
        <h4>Strava Api Application Keys</h4>
        <Input
          inputTypeProps={'text'}
          inputIdProps={'register-client-id'}
          inputAriaLabelProps={'client id'}
          inputNameProps={'register-client-id'}
          inputPlaceholderProps={'client ID'}
          inputRefProps={clientIdRef}
        />
        <Input
          inputTypeProps={'text'}
          inputIdProps={'register-client-secret'}
          inputAriaLabelProps={'client secret'}
          inputNameProps={'register-client-secret'}
          inputPlaceholderProps={'client secret'}
          inputRefProps={clientSecretRef}
        />
        <Input
          inputTypeProps={'text'}
          inputIdProps={'register-access-token'}
          inputAriaLabelProps={'your access token'}
          inputNameProps={'register-access-token'}
          inputPlaceholderProps={'your access token'}
          inputRefProps={accessTokenRef}
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
