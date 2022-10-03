import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import SegmentSnapshotSmall from './SegmentSnapshotSmall/SegmentSnapshotSmall';
import { useAuth } from '../../contexts/AuthContext';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import ActivityCard from './ActivityCard/ActivityCard';
import StravaSyncBtn from './StravaSyncBtn/StravaSyncBtn';

// import http from '../../../http/response/';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { signUp, currentUser } = useAuth();

  console.log(userInfo);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const getUserInfo = await fetch(
          `http://localhost/mooch_be_dev/athlete/?userId=${currentUser.uid}`
        );

        const getUserInfoJson = await getUserInfo.json();
        const getUserStats = await fetch(
          `http://localhost/mooch_be_dev/athlete/stats/?userId=${currentUser.uid}`
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
  }, [currentUser.uid]);

  const userInfoContent = userInfo ? (
    <UserInfo
      userImgProps={userInfo.userProfile[0].profileImgUrl}
      firstnameProps={userInfo.userProfile[0].firstName}
      lastnameProps={userInfo.userProfile[0].lastName}
    />
  ) : null;

  const userStatsContent = userInfo ? (
    <UserStats
      rideYearProps={parseInt(userInfo.userStats[0].rideAllTimeDist)}
      rideAllProps={parseInt(userInfo.userStats[0].rideYearDist)}
      runYearProps={parseInt(userInfo.userStats[0].runAllTimeDist)}
      runAllProps={parseInt(userInfo.userStats[0].runYearDist)}
      swimYearProps={parseInt(userInfo.userStats[0].swimAllTimeDist)}
      swimAllProps={parseInt(userInfo.userStats[0].swimYearDist)}
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
            <StravaSyncBtn
              uidProps={currentUser.uid}
              userInfoProps={userInfo}
              setUserInfoProps={setUserInfo}
            />
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
