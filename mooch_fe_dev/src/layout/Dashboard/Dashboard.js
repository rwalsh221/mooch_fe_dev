import React from 'react';
import classes from './Dashboard.module.css';
import SegmentSnapshotSmall from './SegmentSnapshotSmall/SegmentSnapshotSmall';

import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import ActivityCard from './ActivityCard/ActivityCard';

const Dashboard = () => (
  <div data-wrapper="max-content-width">
    <main className={classes.dashboard}>
      <section className={classes.dashboard_user}>
        <UserInfo />
        <UserStats />
      </section>
      <section className={classes.dashboard_recent}>
        <ActivityCard />
        <ActivityCard />
      </section>
      <section className={classes.dashboard_segments}>
        <SegmentSnapshotSmall />
        <SegmentSnapshotSmall />
        <SegmentSnapshotSmall />
      </section>
    </main>
  </div>
);

export default Dashboard;
