import React from 'react';
import classes from './UserStats.module.css';

const UserStats = () => (
  <div className={classes.user_stats}>
    <div className={classes.stat_btn_container}>
      <button>
        <span className="material-icons">assignment</span>
      </button>
      <button>
        <span className="material-icons">directions_bike</span>
      </button>
      <button>
        <span className="material-icons">run_circle</span>
      </button>
      <button>
        <span className="material-icons">rowing</span>
      </button>
    </div>
    <div>
      <p className={classes.stat_title} data-card-style="title">
        this week
      </p>
      <p className={classes.stat_total} data-card-style="total">
        49km
      </p>
    </div>
    <div>
      <p className={classes.stat_title} data-card-style="title">
        this year
      </p>
      <p className={classes.stat_total} data-card-style="total">
        249km
      </p>
    </div>
  </div>
);

export default UserStats;
