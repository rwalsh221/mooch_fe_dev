import React, { useState, useRef } from 'react';
import classes from './UserStats.module.css';

import { metersToKilometer } from '../../../helpers/unitConversion';

const UserStats = ({
  rideYearProps,
  rideAllProps,
  runYearProps,
  runAllProps,
  swimYearProps,
  swimAllProps,
}) => {
  const [statDisplay, setStatDisplay] = useState({
    activity: 'allActivities',
    prevRef: null,
  });

  const allActivitiesBtnRef = useRef(null);
  const rideBtnRef = useRef(null);
  const runBtnRef = useRef(null);
  const swimBtnRef = useRef(null);

  // CHECK FOR REFACTOR
  const stats = {
    ride: { yearTotal: rideYearProps, allTimeTotal: rideAllProps },
    run: { yearTotal: runYearProps, allTimeTotal: runAllProps },
    swim: { yearTotal: swimYearProps, allTimeTotal: swimAllProps },
    allActivities: {
      yearTotal: rideYearProps + runYearProps + swimYearProps,
      allTimeTotal: rideAllProps + runAllProps + swimAllProps,
    },
  };

  const statsDisplayHandler = (activity, ref) => {
    const statDisplayCopy = { ...statDisplay };

    statDisplayCopy.prevRef = ref;
    statDisplayCopy.activity = activity;

    if (statDisplay.prevRef === null) {
      allActivitiesBtnRef.current.style.backgroundColor = 'hsl(0, 0%, 100%)';
      ref.current.style.backgroundColor = 'hsl(66, 17%, 32%)';
      setStatDisplay({ ...statDisplayCopy });
      return;
    }
    statDisplay.prevRef.current.style.backgroundColor = 'hsl(0, 0%, 100%)';
    ref.current.style.backgroundColor = 'hsl(66, 17%, 32%)';
    setStatDisplay({ ...statDisplayCopy });
  };

  console.log(stats);

  return (
    <div className={classes.user_stats}>
      <div className={classes.stat_btn_container}>
        <button
          ref={allActivitiesBtnRef}
          onClick={() =>
            statsDisplayHandler('allActivities', allActivitiesBtnRef)
          }
        >
          <span className="material-icons">assignment</span>
        </button>
        <button
          ref={rideBtnRef}
          onClick={() => statsDisplayHandler('ride', rideBtnRef)}
        >
          <span className="material-icons">directions_bike</span>
        </button>
        <button
          ref={runBtnRef}
          onClick={() => statsDisplayHandler('run', runBtnRef)}
        >
          <span className="material-icons">run_circle</span>
        </button>
        <button
          ref={swimBtnRef}
          onClick={() => statsDisplayHandler('swim', swimBtnRef)}
        >
          <span className="material-icons">pool</span>
        </button>
      </div>
      <div className={classes.stat_container}>
        <p className={classes.stat_title} data-card-style="title">
          this year
        </p>
        <p className={classes.stat_total} data-card-style="total">
          {metersToKilometer(stats[statDisplay.activity].yearTotal)}km
        </p>
      </div>
      <div className={classes.stat_container}>
        <p className={classes.stat_title} data-card-style="title">
          all time
        </p>
        <p className={classes.stat_total} data-card-style="total">
          {metersToKilometer(stats[statDisplay.activity].allTimeTotal)}km
        </p>
      </div>
    </div>
  );
};

export default UserStats;
