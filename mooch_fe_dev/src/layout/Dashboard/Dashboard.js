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
  const [userInfo, setUserInfo] = useState({
    firstname: 'test',
    lastname: 'user',
    profile_medium: '',
  });
  console.log(userInfo);
  useEffect(() => {
    console.log('GET');
    const getData = async () => {
      try {
        const getUserInfo = await fetch(
          'http://localhost/mooch_be_dev/athlete/',
          {
            // mode: 'no-cors',
          }
        );
        console.log(getUserInfo);
        const getUserInfoJson = await getUserInfo.json();
        console.log(getUserInfoJson);
        setUserInfo(getUserInfoJson);
      } catch (error) {
        console.error(error);
      }
    };

    // getData();
  }, []);

  return (
    <>
      <Header />
      <main className={classes.dashboard}>
        <div
          className={classes.dashboard_container}
          data-wrapper="max-content-width"
        >
          <section className={classes.dashboard_user}>
            <UserInfo
              userImgProps={userInfo.profile_medium}
              firstnameProps={userInfo.firstname}
              lastnameProps={userInfo.lastname}
            />
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
};
export default Dashboard;
