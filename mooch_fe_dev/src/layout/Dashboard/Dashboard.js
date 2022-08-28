import React from 'react';
import classes from './Dashboard.module.css';

import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';

const Dashboard = () => (
  <main className={classes.dashboard}>
    <section className={classes.dashboard_user}>
      <UserInfo />
      <UserStats />
    </section>
    <section className={classes.dashboard_recent}></section>
    <section className={classes.dashboard_segments}></section>
  </main>
);

export default Dashboard;
