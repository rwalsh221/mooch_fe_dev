import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from '../RegisterConfirm.module.css';
import Card from '../../../components/Layout/Card/Card';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';

const SignUpContinue = ({ userStateProps }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <div className={classes.profile_img_container}>
        <img src={userStateProps.userImg} alt="user profile" />
      </div>
      <div className={classes.confirm_card_container}>
        <p>
          <span>{userStateProps.userFirstName}</span>&nbsp;
          <span>{userStateProps.userLastName}</span>
        </p>
        <p>
          <span data-heading="logo-small">MoOCH</span>&nbsp;&amp;&nbsp;
          <span className={classes.strava}>STRAVA</span>&nbsp; link Complete
        </p>
        <p>please continue to your dashboard</p>
        <div className={classes.confirm_card_btn_container}>
          <ButtonGreen
            contentProps="Continue"
            onClickProps={() => {
              navigate('/dashboard');
            }}
            btnTypeProps="button"
          />
        </div>
      </div>
    </Card>
  );
};

SignUpContinue.propTypes = {
  userStateProps: PropTypes.shape({
    userImg: PropTypes.string.isRequired,
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignUpContinue;
