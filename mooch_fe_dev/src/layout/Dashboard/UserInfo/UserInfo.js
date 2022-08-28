import React from 'react';
import classes from './UserInfo.module.css';

import userImg from '../../../assets/img/forest_bg.jpg';

const UserInfo = ({
  userImgProps,
  usernameProps,
  followingProps,
  followsProps,
  totalActivitiesProps,
}) => (
  <div className={classes.user_info}>
    <img src={userImg} alt="user" className={classes.user_img} />
    <h2>richard</h2>
    <div className={classes.user_stats}>
      <div>
        <p className={classes.user_stats_title} data-card-style="title">
          Following
        </p>
        <p className={classes.user_stats_content} data-card-style="total">
          7
        </p>
      </div>
      <div>
        <p className={classes.user_stats_title} data-card-style="title">
          Followers
        </p>
        <p className={classes.user_stats_content} data-card-style="total">
          6
        </p>
      </div>
      <div>
        <p className={classes.user_stats_title} data-card-style="title">
          Activities
        </p>
        <p className={classes.user_stats_content} data-card-style="total">
          334
        </p>
      </div>
    </div>
  </div>
);

export default UserInfo;
