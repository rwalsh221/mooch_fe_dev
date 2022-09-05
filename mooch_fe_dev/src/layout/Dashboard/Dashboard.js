import React from 'react';
import classes from './Dashboard.module.css';
import SegmentSnapshotSmall from './SegmentSnapshotSmall/SegmentSnapshotSmall';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import ActivityCard from './ActivityCard/ActivityCard';

const Dashboard = () => (
  <>
    <Header />
    <main className={classes.dashboard}>
      <div
        className={classes.dashboard_container}
        data-wrapper="max-content-width"
      >
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
      </div>
    </main>
    <Footer />
  </>
);

export default Dashboard;
