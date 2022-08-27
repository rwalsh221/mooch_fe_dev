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
        <p className={classes.user_stats_title}>Following</p>
        <p className={classes.user_stats_content}>7</p>
      </div>
      <div>
        <p className={classes.user_stats_title}>Followers</p>
        <p className={classes.user_stats_content}>6</p>
      </div>
      <div>
        <p className={classes.user_stats_title}>Activities</p>
        <p className={classes.user_stats_content}>334</p>
      </div>
    </div>
  </div>
);

export default UserInfo;
