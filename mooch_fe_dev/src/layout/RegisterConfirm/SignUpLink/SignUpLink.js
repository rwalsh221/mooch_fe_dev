import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from '../RegisterConfirm.module.css';

import Card from '../../../components/Layout/Card/Card';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';

const SignUpLink = ({
  userStateProps,
  registerMoochApiProps,
  currentUserProps,
}) => {
  const navigate = useNavigate();

  const continueHandler = async () => {
    await registerMoochApiProps();
  };

  const cancelHandler = async () => {
    try {
      await currentUserProps.delete();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

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
          Ready to link&nbsp;
          <span data-heading="logo-small">MoOCH</span>&nbsp;&amp;&nbsp;
          <span className={classes.strava}>STRAVA</span>
        </p>
        <p>
          please continue to link <span data-heading="logo-small">MoOCH</span>
          &nbsp;&amp;&nbsp;
          <span className={classes.strava}>STRAVA</span>
        </p>
        <div className={classes.confirm_card_btn_container}>
          <ButtonGreen
            contentProps="Continue"
            onClickProps={async () => {
              await continueHandler();
            }}
            btnTypeProps="button"
          />
          <ButtonGreen
            contentProps="Cancel"
            onClickProps={() => {
              cancelHandler();
            }}
            btnTypeProps="button"
          />
        </div>
      </div>
    </Card>
  );
};

SignUpLink.propTypes = {
  registerMoochApiProps: PropTypes.func.isRequired,
  userStateProps: PropTypes.shape({
    userImg: PropTypes.string.isRequired,
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired,
  }).isRequired,
  currentUserProps: PropTypes.shape({
    delete: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUpLink;
