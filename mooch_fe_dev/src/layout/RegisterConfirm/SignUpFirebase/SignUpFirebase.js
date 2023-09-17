import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import classes from '../RegisterConfirm.module.css';
import Card from '../../../components/Layout/Card/Card';
import ButtonGreen from '../../../components/Button/ButtonGreen/ButtonGreen';

const SignUpFirebase = ({ userStateProps, fireBaseSignUpProps }) => {
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
          please create your&nbsp;<span data-heading="logo-small">MoOCH</span>
          &nbsp;account
        </p>
        <div className={classes.confirm_card_btn_container}>
          <ButtonGreen
            contentProps="Complete"
            onClickProps={async () => {
              await fireBaseSignUpProps();
            }}
            btnTypeProps="button"
          />
          <ButtonGreen
            contentProps="Cancel"
            onClickProps={() => {
              navigate('/');
            }}
            btnTypeProps="button"
          />
        </div>
      </div>
    </Card>
  );
};

SignUpFirebase.propTypes = {
  fireBaseSignUpProps: PropTypes.func.isRequired,
  userStateProps: PropTypes.shape({
    userImg: PropTypes.string.isRequired,
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignUpFirebase;
