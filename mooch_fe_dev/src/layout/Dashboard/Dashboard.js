import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import SegmentSnapshotSmall from './SegmentSnapshotSmall/SegmentSnapshotSmall';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import ActivityCard from './ActivityCard/ActivityCard';

// import http from '../../../http/response/';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo);
  useEffect(() => {
    console.log('GET');
    const getUserData = async () => {
      try {
        const getUserInfo = await fetch(
          'http://localhost/mooch_be_dev/athlete/'
        );

        const getUserInfoJson = await getUserInfo.json();

        const getUserStats = await fetch(
          'http://localhost/mooch_be_dev/athlete/stats/'
        );

        const getUserStatsJson = await getUserStats.json();

        setUserInfo({
          userProfile: getUserInfoJson,
          userStats: getUserStatsJson,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  const userInfoContent = userInfo ? (
    <UserInfo
      userImgProps={userInfo.userProfile.profile_medium}
      firstnameProps={userInfo.userProfile.firstname}
      lastnameProps={userInfo.userProfile.lastname}
    />
  ) : null;

  const userStatsContent = userInfo ? (
    <UserStats
      rideYearProps={userInfo.userStats.ytd_ride_totals.distance}
      rideAllProps={userInfo.userStats.all_ride_totals.distance}
      runYearProps={userInfo.userStats.ytd_run_totals.distance}
      runAllProps={userInfo.userStats.all_run_totals.distance}
      swimYearProps={userInfo.userStats.ytd_swim_totals.distance}
      swimAllProps={userInfo.userStats.all_swim_totals.distance}
    />
  ) : null;

  return (
    <>
      <Header />
      <main className={classes.dashboard}>
        <div
          className={classes.dashboard_container}
          data-wrapper="max-content-width"
        >
          <section className={classes.dashboard_user}>
            {userInfoContent}
            {userStatsContent}
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
};
export default Dashboard;
