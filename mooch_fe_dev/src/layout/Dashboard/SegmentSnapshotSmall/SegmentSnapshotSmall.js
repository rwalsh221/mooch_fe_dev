import React from 'react';
import classes from './SegmentSnapshotSmall.module.css';

import SegmentSnapshotLeaderboard from './SegmentSnapshotLeaderboard/SegmentSnapshotLeaderboard';
import {
  metersToKilometer,
  secondsToMinutes,
} from '../../../helpers/unitConversion';
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
          dist
        </p>
        <p data-card-style="total">
          {distanceProps < 1000
            ? `${distanceProps}m`
            : `${metersToKilometer(distanceProps, 1)}km`}
        </p>
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
        <div className={classes.leaderboard_user_pr}>
          <p>
            PR&nbsp;
            {leaderboardProps[uidProps].time <= 60
              ? `${leaderboardProps[uidProps].time}s`
              : secondsToMinutes(leaderboardProps[uidProps].time)}
          </p>
        </div>
        <div className={classes.leaderboard_user_img}>
          <img src={userImgProps} alt="user" />
        </div>
        <div className={classes.leaderboard_user_kom}>
          <p>KOM&nbsp;{komProps}</p>
        </div>
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
            secondsToMinutes(572);
            console.log(distanceProps);
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
