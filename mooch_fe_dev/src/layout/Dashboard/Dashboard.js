import React, { useState, useEffect, useCallback } from 'react';
import classes from './Dashboard.module.css';
import { useAuth } from '../../contexts/AuthContext';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DesktopDashboard from './DesktopDashboard/DesktopDashboard';
import MobileDashboard from './MobileDashboard/MobileDashboard';

// add mobile nav and make responsive *done*

// add logout btn to header *done*

// need elev gain on segment card *done*

// add sport switch func for icon on segment card

// refactor sync mooch starva func and add get segment cards *done*

// add loading info to sync with strava button *done*

// adjust layout so all inline on left side. *done*

// TODO: look at error when sign in failed.
// TODO: add fastest user img to segment card. need to get from backend

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { currentUser } = useAuth();

  const getUserData = useCallback(async () => {
    try {
      const getUserInfo = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/?userId=${currentUser.uid}`
      );

      const getUserInfoJson = await getUserInfo.json();

      const getUserStats = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/?userId=${currentUser.uid}`
      );

      const getUserStatsJson = await getUserStats.json();

      const getUserSegments = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/segments/?userId=${currentUser.uid}`
      );

      const getUserSegmentsJson = await getUserSegments.json();

      setUserInfo({
        userProfile: getUserInfoJson,
        userStats: getUserStatsJson,
        userSegments: getUserSegmentsJson,
      });
    } catch (error) {
      console.error(error);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <Header signOutProps={true} />
      <main className={classes.dashboard}>
        {window.screen.width > 820 ? (
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
