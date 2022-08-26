import React, { useState } from 'react';
import classes from './Register.module.css';
// COMPONENTS
import Footer from '../../components/Footer/Footer';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
// ASSETS
import forestBackground from '../../assets/img/forest_bg.jpg';

const Register = () => {
  const [registerFormContent, setRegisterFormContent] = useState(true);

  const registerFormHandler = () => {
    if (registerFormContent) {
      setRegisterFormContent(false);
      return;
    }
    setRegisterFormContent(true);
  };
  const signUpContent = (
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
        />

        {/* <label for="sign-up-password-confirm">confirm password</label> */}
        <input
          type="password"
          id="register-password-confirm"
          aria-label="confirm password"
          name="register-password-confirm"
          placeholder="Confirm"
          // autoComplete="new-password"
        />
        <br />
        <ButtonGreen contentProps={'sign up'} />
      </form>
      <p>
        Have an account? Sign up&nbsp;
        <span onClick={registerFormHandler} className={classes.form_change}>
          here
        </span>
      </p>
    </>
  );

  const loginContent = (
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
        Need an account? login &nbsp;
        <span onClick={registerFormHandler} className={classes.form_change}>
          here
        </span>
      </p>
    </>
  );

  return (
    <div className={classes.register_grid} data-wrapper="max-content-width">
      <main className={classes.register_main}>
        <div className={classes.register_heading_container}>
          <h1 className={classes.register_heading} data-heading={'logo'}>
            MoOCH
          </h1>
        </div>
        <h2 className={classes.register_secondary_heading}>
          The #1 app for mooching about
        </h2>
        <div className={classes.register_form__container}>
          {/* <div class={classes.register_bg_container}>
          <img src={forestBackground} alt="background" />
        </div> */}
          <div
            className={`${classes.sign_up_card} ${classes.register_form__content}`}
          >
            <h2
              className={classes.register_card__logo}
              data-heading={'logo-small'}
            >
              MoOCH
            </h2>
            {registerFormContent ? signUpContent : loginContent}
          </div>
          <div className={classes.register_form__img}>
            <img
              className={classes.register_card__img}
              src={forestBackground}
              alt="register"
            />
          </div>

          {/* <div class={`${classes.sign_up_card} ${classes.register_form__card}`}>
          <h3 class={classes.register_card__heading}>log in</h3>
          <form action="post">
            <label for="log-in-email"></label>
            <input type="email" id="log-in-email" />
            <br />
            <label for="log-in-password"></label>
            <input type="password" id="log-in-password" />
          </form>
        </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
