import React from 'react';
import classes from './SegmentSnapshotSmall.module.css';

import SegmentSnapshotLeaderboard from './SegmentSnapshotLeaderboard/SegmentSnapshotLeaderboard';
import {
  metersToKilometer,
  secondsToMinutes,
} from '../../../helpers/unitConversion';
const SegmentSnapshotSmall = ({
  newUserProps,
  segmentNameProps,
  activityTypeProps,
  cityProps,
  stateProps,
  distanceProps,
  elevationHighProps,
  elevationLowProps,
  avgGradeProps,
  komProps,
  leaderboardProps,
  uidProps,
  userImgProps,
}) => {
  if (newUserProps) {
    return (
      <div className={classes.segment_snapshot_no_seg}>
        <h2>YOU DO NOT HAVE ANY SEGMENTS</h2>
        <p>please sync MoOCH with STRAVA</p>
      </div>
    );
  } else {
    const elevationGain =
      avgGradeProps.toString().indexOf('-') === -1 //avggradeprops is number
        ? elevationHighProps - elevationLowProps
        : elevationLowProps - elevationHighProps;

    console.log(leaderboardProps);

    return (
      <div className={classes.segment_snapshot_sml}>
        <h2>{segmentNameProps}</h2>
        <p>
          {cityProps},&nbsp;{stateProps}
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
            <p data-card-style="total">{elevationGain}m</p>
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
              <p>
                KOM&nbsp;
                {komProps < 60 ? `${komProps}s` : secondsToMinutes(komProps)}
              </p>
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
              {Object.keys(leaderboardProps).map((el, index) => {
                console.log(el);
                return (
                  <SegmentSnapshotLeaderboard
                    athleteNameProps={leaderboardProps[el].name}
                    athleteTimeProps={leaderboardProps[el].time}
                    segmentDistanceProps={distanceProps}
                    leaderboardPositionProps={index + 1}
                    key={index}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
};

export default SegmentSnapshotSmall;
