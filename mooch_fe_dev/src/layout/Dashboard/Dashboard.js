import React, { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import SegmentSnapshotSmall from './SegmentSnapshotSmall/SegmentSnapshotSmall';
import { useAuth } from '../../contexts/AuthContext';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DesktopDashboard from './DesktopDashboard/DesktopDashboard';
import MobileDashboard from './MobileDashboard/MobileDashboard';
import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import ActivityCard from './ActivityCard/ActivityCard';
import StravaSyncBtn from './StravaSyncBtn/StravaSyncBtn';

// add mobile nav and make responsive *done*

// add logout btn to header

// need elev gain on segment card

// add sport switch func for icon on segment card

// refactor sync mooch starva func and add get segment cards

// add loading info to sync with strava button

// adjust layout so all inline on left side. *done*

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
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
    };

    getUserData();
  }, [currentUser.uid]);
  console.log('render');
  console.log(userInfo);

  return (
    <>
      <Header />
      <main className={classes.dashboard}>
        {window.screen.width > 820 ? (
          <DesktopDashboard
            userInfoProps={userInfo}
            setUserInfoProps={setUserInfo}
            uidProps={currentUser.uid}
          />
        ) : (
          <MobileDashboard
            userInfoProps={userInfo}
            setUserInfoProps={setUserInfo}
            uidProps={currentUser.uid}
          />
        )}
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
