import React from 'react';
import PropTypes from 'prop-types';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import classes from './SignUpHelp.module.css';

const SignUpHelp = ({ needHelpHandlerProps }) => (
  <div className={classes.help}>
    <div>
      <h2>Sign Up Guide</h2>
      <ButtonGreen
        onClickProps={needHelpHandlerProps}
        contentProps="close"
        btnTypeProps="button"
      />
    </div>

    <ol>
      <li>
        1, Log in to strava, go to settings under you profile picture at the top
        of the page
      </li>
      <li>
        2, Add api to the end of the strava url:
        https://www.strava.com/settings/api
      </li>
      <li>3, Input anything you want for Application Name</li>
      <li>
        4, Input&nbsp;
        <span className={classes.alert}>https://www.localhost.com</span>
        &nbsp;for website
      </li>
      <li>
        5, Input <span className={classes.alert}>mooch-bfeeb.web.app</span>
        &nbsp;for Authorization Input Domain
      </li>
      <li>6, Complete the sign up form with your strava api details</li>
      <li>
        7, You dont need to use real email: something like&nbsp;
        <span className={classes.alert}>YOURname@email.com</span>
      </li>
      <li>
        8, Use a simple password but use letters and numbers: something
        like&nbsp;<span className={classes.alert}>password1</span>
      </li>
    </ol>
  </div>
);

SignUpHelp.propTypes = {
  needHelpHandlerProps: PropTypes.func.isRequired,
};

export default SignUpHelp;
