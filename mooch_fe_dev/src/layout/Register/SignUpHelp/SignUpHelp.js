import React from 'react';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';
import classes from './SignUpHelp.module.css';

const SignUpHelp = ({ needHelpHandlerProps }) => (
  <div className={classes.help}>
    <div>
      <h2>Sign Up Guide</h2>
      <ButtonGreen onClickProps={needHelpHandlerProps} contentProps={'close'} />
    </div>

    <ol>
      <li>
        1, Click on the padlock icon at the top of the page next to the URL and
        click site settings
      </li>
      <li>2, Under PERMISSIONS allow INSECURE CONTENT</li>
      <li>
        3, Log in to strava, go to settings under you profile picture at the top
        of the page
      </li>
      <li>
        4, Add api to the end of the strava url:
        https://www.strava.com/settings/api
      </li>
      <li>5, Input anything you want for Application Name</li>
      <li>
        6, Input{' '}
        <span className={classes.alert}>https://www.localhost.com</span>
        &nbsp;for website
      </li>
      <li>
        7, Input <span className={classes.alert}>mooch-bfeeb.web.app</span>
        &nbsp;for Authorization Input Domain
      </li>
      <li>8, Complete the sign up form with your strava api details</li>
      <li>
        9, You dont need to use real email: something like&nbsp;
        <span className={classes.alert}>YOURname@email.com</span>
      </li>
      <li>
        10, Use a simple password but use letters and numbers: something
        like&nbsp;<span className={classes.alert}>password1</span>
      </li>
    </ol>
  </div>
);

export default SignUpHelp;
