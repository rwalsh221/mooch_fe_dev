import React from 'react';
import classes from './SegmentSnapshotLeaderboard.module.css';

import {
  secondsToMinutes,
  calculateSpeed,
} from '../../../../helpers/unitConversion';

const SegmentSnapshotLeaderboard = ({
  athleteNameProps,
  athleteTimeProps,
  segmentDistanceProps,
  leaderboardPositionProps,
}) => {
  console.log(segmentDistanceProps);
  return (
    <li className={classes.leaderboard}>
      <div>{leaderboardPositionProps}</div>
      <div className={classes.leaderboard_top__name}>{athleteNameProps}</div>
      <div className={classes.leaderboard_top__time}>
        {athleteTimeProps <= 60
          ? `${athleteTimeProps}s`
          : `${secondsToMinutes(athleteTimeProps)}`}
      </div>
      <div className={classes.leaderboard_top__speed}>
        {calculateSpeed(segmentDistanceProps, athleteTimeProps)}
        <span data-font="speedUnit">km/h</span>
      </div>
    </li>
  );
};

export default SegmentSnapshotLeaderboard;
