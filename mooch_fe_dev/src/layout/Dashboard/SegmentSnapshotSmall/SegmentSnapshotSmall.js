import React from 'react';
import classes from './SegmentSnapshotSmall.module.css';

import userImg from '../../../assets/img/forest_bg.jpg';

const SegmentSnapshotSmall = () => (
  <div className={classes.segment_snapshot_sml}>
    <h2>segment name</h2>
    <p>segment location</p>
    <div className={classes.segment_info}>
      <div>
        <p className={classes.segment_info__title} data-card-style="title">
          distance
        </p>
        <p data-card-style="total">1km</p>
      </div>
      <div>
        <p className={classes.segment_info__title} data-card-style="title">
          elv gain
        </p>
        <p data-card-style="total">50m</p>
      </div>
      <div>
        <p className={classes.segment_info__title} data-card-style="title">
          sport
        </p>
        <span class="material-icons" data-font="icon">
          directions_bike
        </span>
      </div>
    </div>
    <div className={classes.segment_leaderboard}>
      <h3>top 3</h3>
      <div className={classes.leaderboard_user}>
        <img src={userImg} alt="user" />
        <p>your PR 1:08</p>
      </div>
      <div className={classes.leaderboard_top}>
        <div className={classes.leaderboard_top__header}>
          <p data-card-style="title">athlete</p>
          <p data-card-style="title">time</p>
        </div>
        <ol>
          <li>
            <div className={classes.leaderboard_top__name}>richard</div>
            <div className={classes.leaderboard_top__time}>36s</div>
            <div className={classes.leaderboard_top__speed}>
              35.8<span data-font="speedUnit">km/h</span>
            </div>
          </li>
          <li>
            <div className={classes.leaderboard_top__name}>richard</div>
            <div className={classes.leaderboard_top__time}>36s</div>
            <div className={classes.leaderboard_top__speed}>
              35.8<span data-font="speedUnit">km/h</span>
            </div>
          </li>
          <li>
            <div className={classes.leaderboard_top__name}>richard</div>
            <div className={classes.leaderboard_top__time}>36s</div>
            <div className={classes.leaderboard_top__speed}>
              35.8<span data-font="speedUnit">km/h</span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

export default SegmentSnapshotSmall;
