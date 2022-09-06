import React, { useState } from 'react';
import classes from './UserStats.module.css';

const UserStats = ({
  rideYearProps,
  rideAllProps,
  runYearProps,
  runAllProps,
  swimYearProps,
  swimAllProps,
}) => {
  const [statDisplay, setStatDisplay] = useState('allActivities');

  const stats = {
    ride: { yearTotal: rideYearProps, allTimeTotal: rideAllProps },
    run: { yearTotal: runYearProps, allTimeTotal: runAllProps },
    swim: { yearTotal: swimYearProps, allTimeTotal: swimAllProps },
    allActivities: {
      yearTotal: rideYearProps + runYearProps + swimYearProps,
      allTimeTotal: rideAllProps + runAllProps + swimAllProps,
    },
  };

  const statsDisplayHandler = (activity) => {
    setStatDisplay(activity);
  };

  console.log(stats);

  return (
    <div className={classes.user_stats}>
      <div className={classes.stat_btn_container}>
        <button onClick={() => statsDisplayHandler('allActivities')}>
          <span className="material-icons">assignment</span>
        </button>
        <button onClick={() => statsDisplayHandler('allActivities')}>
          <span className="material-icons">directions_bike</span>
        </button>
        <button onClick={() => statsDisplayHandler('allActivities')}>
          <span className="material-icons">run_circle</span>
        </button>
        <button onClick={() => statsDisplayHandler('allActivities')}>
          <span className="material-icons">rowing</span>
        </button>
      </div>
      <div>
        <p className={classes.stat_title} data-card-style="title">
          this year
        </p>
        <p className={classes.stat_total} data-card-style="total">
          {stats[statDisplay].yearTotal}km
        </p>
      </div>
      <div>
        <p className={classes.stat_title} data-card-style="title">
          all time
        </p>
        <p className={classes.stat_total} data-card-style="total">
          {stats[statDisplay].allTimeTotal}km
        </p>
      </div>
    </div>
  );
};

export default UserStats;
