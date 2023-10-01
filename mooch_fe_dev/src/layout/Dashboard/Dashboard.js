// /* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import classes from './Dashboard.module.css';
import { useAuth } from '../../contexts/AuthContext';

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

  const getUserData = useCallback(async () => {
    try {
      const getUserInfo = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete?userId=${currentUser.uid}`
      );

      const getUserInfoJson = await getUserInfo.json();

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

  const dashboardSizeHandler = () => {
    if (window.screen.width > 820) {
      return (
        <DesktopDashboard
          userInfoProps={userInfo}
          uidProps={currentUser.uid}
          getUserDataProps={getUserData}
        />
      );
    }
    return (
      <MobileDashboard
        userInfoProps={userInfo}
        uidProps={currentUser.uid}
        getUserDataProps={getUserData}
      />
    );
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <Header signOutProps />
      <main className={classes.dashboard}>
        {loading ? (
          <div className={classes.dashboard_spinner_container}>
            <Spinner />
          </div>
        ) : (
          dashboardSizeHandler()
        )}
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
