import React from 'react';
import classes from './SegmentSnapshotLeaderboard.module.css';

const SegmentSnapshotLeaderboard = ({ athleteNameProps, athleteTimeProps }) => {
  console.log(athleteNameProps);
  return (
    <li className={classes.leaderboard}>
      <div className={classes.leaderboard_top__name}>{athleteNameProps}</div>
      <div className={classes.leaderboard_top__time}>{athleteTimeProps}</div>
      <div className={classes.leaderboard_top__speed}>
        35.8<span data-font="speedUnit">km/h</span>
      </div>
    </li>
  );
};

export default SegmentSnapshotLeaderboard;
