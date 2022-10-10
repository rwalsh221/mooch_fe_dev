import React from 'react';
import classes from './SegmentSnapshotSmall.module.css';

import SegmentSnapshotLeaderboard from './SegmentSnapshotLeaderboard/SegmentSnapshotLeaderboard';
import userImg from '../../../assets/img/forest_bg.jpg';

const SegmentSnapshotSmall = ({
  segmentNameProps,
  activityTypeProps,
  cityProps,
  stateProps,
  distanceProps,
  elevationHighProps,
  elevationLowProps,
  komProps,
  leaderboardProps,
  uidProps,
  userImgProps,
}) => (
  <div className={classes.segment_snapshot_sml}>
    <h2>{segmentNameProps}</h2>
    <p>
      {cityProps}&amp;{stateProps}
    </p>
    <div className={classes.segment_info}>
      <div>
        <p className={classes.segment_info__title} data-card-style="title">
          {distanceProps}
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
        <span className="material-icons" data-font="icon">
          directions_bike
        </span>
      </div>
    </div>
    <div className={classes.segment_leaderboard}>
      <h3>leaderboard</h3>
      <div className={classes.leaderboard_user}>
        <img src={userImgProps} alt="user" />
        <p>PR {leaderboardProps[uidProps].time}</p>
        <p>kom&nbsp;{komProps}</p>
      </div>
      <div className={classes.leaderboard_all}>
        <div className={classes.leaderboard_all__header}>
          <p data-card-style="title" className={classes.title_athlete}>
            athlete
          </p>
          <p data-card-style="title" className={classes.title_time}>
            time
          </p>
          <p data-card-style="title" className={classes.title_speed}>
            speed
          </p>
        </div>
        <ol>
          {Object.keys(leaderboardProps).map((el) => {
            console.log(leaderboardProps[el].time);
            console.log(el);
            return (
              <SegmentSnapshotLeaderboard
                athleteNameProps={leaderboardProps[el].name}
                athleteTimeProps={leaderboardProps[el].time}
              />
            );
          })}
        </ol>
      </div>
    </div>
  </div>
);

export default SegmentSnapshotSmall;
