import React from 'react';
import PropTypes from 'prop-types';
import classes from './SegmentSnapshotLeaderboard.module.css';

import { calculateSpeed } from '../../../../helpers/unitConversion';

const SegmentSnapshotLeaderboard = ({
  athleteNameProps,
  athleteTimeProps,
  segmentDistanceProps,
  leaderboardPositionProps,
  formatTimeProps,
}) => (
  <li className={classes.leaderboard}>
    <div>{leaderboardPositionProps}</div>
    <div className={classes.leaderboard_top__name}>{athleteNameProps}</div>
    <div className={classes.leaderboard_top__time}>
      {formatTimeProps(athleteTimeProps)}
    </div>
    <div className={classes.leaderboard_top__speed}>
      {calculateSpeed(segmentDistanceProps, athleteTimeProps)}
      <span data-font="speedUnit">km/h</span>
    </div>
  </li>
);

SegmentSnapshotLeaderboard.propTypes = {
  athleteNameProps: PropTypes.string.isRequired,
  athleteTimeProps: PropTypes.number.isRequired,
  segmentDistanceProps: PropTypes.number.isRequired,
  leaderboardPositionProps: PropTypes.number.isRequired,
  formatTimeProps: PropTypes.func.isRequired,
};

export default SegmentSnapshotLeaderboard;
