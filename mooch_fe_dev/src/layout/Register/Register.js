import React from 'react';
import classes from './Register.module.css';

import Footer from '../../components/Footer/Footer';
import forestBackground from '../../assets/img/forest_bg.jpg';

const Register = () => (
  <div class={classes.register_grid}>
    <main class={classes.register_main}>
      <div class={classes.register_heading_container}>
        <h1 class={classes.register_heading} data-heading={'logo'}>
          MoOCH
        </h1>
      </div>
      <h2 class={classes.register_secondary__heading}>fancy a mooch?</h2>
      <div class={classes.register_form__container}>
        {/* <div class={classes.register_bg_container}>
          <img src={forestBackground} alt="background" />
        </div> */}
        <div class={`${classes.sign_up_card} ${classes.register_form__card}`}>
          <h3 class={classes.register_card__heading}>sign up</h3>
          <form action="post">
            <label for="sign-up-email">email</label>
            <input type="email" id="sign-up-email" />
            <br />
            <label for="sign-up-strava-id">strava id</label>
            <input type="number" id="sign-up-strava-id" />
            <br />
            <label for="sign-up-password">password</label>
            <input type="password" id="sign-up-password" />
            <br />
            <label for="sign-up-password-confirm">confirm password</label>
            <input type="password" id="sign-up-password-confirm" />
          </form>
        </div>
        <div class={`${classes.sign_up_card} ${classes.register_form__card}`}>
          <h3 class={classes.register_card__heading}>log in</h3>
          <form action="post">
            <label for="log-in-email"></label>
            <input type="email" id="log-in-email" />
            <br />
            <label for="log-in-password"></label>
            <input type="password" id="log-in-password" />
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Register;
