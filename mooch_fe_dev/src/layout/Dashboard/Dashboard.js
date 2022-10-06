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
      console.log(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/?userId=${currentUser.uid}`
      );
      try {
        const getUserInfo = await fetch(
          `${process.env.REACT_APP_MOOCH_API_URL}/athlete/?userId=${currentUser.uid}`
        );

        const getUserInfoJson = await getUserInfo.json();
        console.log(getUserInfoJson);
        const getUserStats = await fetch(
          `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/?userId=${currentUser.uid}`
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

    const getUserSegmentData = async () => {
      try {
        const getUserSegments = await fetch(
          `${process.env.REACT_APP_MOOCH_API_URL}/segments/?userId=${currentUser.uid}`
        );

        const getUserSegmentsJson = await getUserSegments.json();
        console.log(getUserSegmentsJson);
      } catch (error) {}
    };

    getUserData();
    getUserSegmentData();
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
      rideYearProps={parseInt(userInfo.userStats[0].rideYearDist)}
      rideAllProps={parseInt(userInfo.userStats[0].rideAllTimeDist)}
      runYearProps={parseInt(userInfo.userStats[0].runYearDist)}
      runAllProps={parseInt(userInfo.userStats[0].runAllTimeDist)}
      swimYearProps={parseInt(userInfo.userStats[0].swimYearDist)}
      swimAllProps={parseInt(userInfo.userStats[0].swimAllTimeDist)}
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
          <div className={classes.dashboard_user}>
            {userInfoContent}
            {userStatsContent}
            <StravaSyncBtn
              uidProps={currentUser.uid}
              userInfoProps={userInfo}
              setUserInfoProps={setUserInfo}
            />
          </div>
          <div className={classes.dashboard_segment_leaderboard}>
            <SegmentSnapshotSmall />
            <SegmentSnapshotSmall />
            <SegmentSnapshotSmall />
            <SegmentSnapshotSmall />
          </div>
          <div className={classes.dashboard_segments}>
            <SegmentSnapshotSmall />
            <SegmentSnapshotSmall />
            <SegmentSnapshotSmall />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
