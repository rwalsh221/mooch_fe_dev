/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import classes from './Dashboard.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DesktopDashboard from './DesktopDashboard/DesktopDashboard';
import MobileDashboard from './MobileDashboard/MobileDashboard';
import Spinner from '../../components/Spinner/Spinner';

// TODO: add fastest user img to segment card. need to get from backend
// TODO: look at backend headers

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  console.log(currentUser);

  const getUserData = useCallback(async () => {
    try {
      const getUserInfo = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete?userId=${currentUser.uid}`
      );

      const getUserInfoJson = await getUserInfo.json();

      console.log(getUserInfoJson);

      const getUserStats = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats?userId=${currentUser.uid}`
      );

      const getUserStatsJson = await getUserStats.json();

      const getUserSegments = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/segments?userId=${currentUser.uid}`
      );

      const getUserSegmentsJson = await getUserSegments.json();

      setUserInfo({
        userProfile: getUserInfoJson,
        userStats: getUserStatsJson,
        userSegments: getUserSegmentsJson,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  console.log(currentUser);
  return (
    <>
      <Header signOutProps />
      <main className={classes.dashboard}>
        {loading ? (
          <Spinner />
        ) : window.screen.width > 820 ? (
          <DesktopDashboard
            userInfoProps={userInfo}
            uidProps={currentUser.uid}
            getUserDataProps={getUserData}
          />
        ) : (
          <MobileDashboard
            userInfoProps={userInfo}
            uidProps={currentUser.uid}
            getUserDataProps={getUserData}
          />
        )}
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
