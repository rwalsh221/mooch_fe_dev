import React, { useState } from 'react';
import classes from './Register.module.css';
// COMPONENTS
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ButtonGreen from '../../components/Button/ButtonGreen/ButtonGreen';
import SignUpHelp from './SignUpHelp/SignUpHelp';
// ASSETS
import forestBackground from '../../assets/img/forest_bg.jpg';

const Register = () => {
  const [registerFormContent, setRegisterFormContent] = useState({
    signIn: false,
    signUp: true,
  });

  const [needHelp, setNeedHelp] = useState(false);

  const formContentHandler = () => {
    const stateCopy = { ...registerFormContent };

    if (registerFormContent.signUp) {
      stateCopy.signUp = false;
      stateCopy.signIn = true;
      setRegisterFormContent({ ...stateCopy });
      return;
    }
    stateCopy.signUp = true;
    stateCopy.signIn = false;
    setRegisterFormContent({ ...stateCopy });
  };

  const needHelpHandler = () => {
    const needHelpStatus = needHelp;
    setNeedHelp(!needHelpStatus);
  };

  return (
    <div className={classes.register_grid}>
      <Header />
      <main className={classes.register_main} data-wrapper="max-content-width">
        <h2 className={classes.register_secondary_heading}>
          The #1 app for mooching about
        </h2>
        {needHelp && <SignUpHelp needHelpHandlerProps={needHelpHandler} />}
        <div className={classes.register_form__container}>
          <div
            className={`${classes.sign_up_card} ${classes.register_form__content}`}
          >
            <h2
              className={classes.register_card__logo}
              data-heading={'logo-small'}
            >
              MoOCH
            </h2>
            {registerFormContent.signIn && (
              <SignIn formContentHandlerProps={formContentHandler} />
            )}
            {registerFormContent.signUp && (
              <SignUp
                formContentHandlerProps={formContentHandler}
                needHelpHandlerProps={needHelpHandler}
              />
            )}
          </div>
          <div className={classes.register_form__img}>
            <img
              className={classes.register_card__img}
              src={forestBackground}
              alt="register"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
