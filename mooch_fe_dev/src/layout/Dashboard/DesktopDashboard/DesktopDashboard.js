import React from 'react';
import classes from './DesktopDashboard.module.css';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import UserInfo from '../UserInfo/UserInfo';
import UserStats from '../UserStats/UserStats';
import SegmentSnapshotSmall from '../SegmentSnapshotSmall/SegmentSnapshotSmall';
import StravaSyncBtn from '../StravaSyncBtn/StravaSyncBtn';

const DesktopDashboard = ({ userInfoProps, uidProps, setUserInfoProps }) => {
  const userInfoContent = userInfoProps ? (
    <UserInfo
      userImgProps={userInfoProps.userProfile[0].profileImgUrl}
      firstnameProps={userInfoProps.userProfile[0].firstName}
      lastnameProps={userInfoProps.userProfile[0].lastName}
    />
  ) : null;

  const userStatsContent = userInfoProps ? (
    <UserStats
      rideYearProps={parseInt(userInfoProps.userStats[0].rideYearDist)}
      rideAllProps={parseInt(userInfoProps.userStats[0].rideAllTimeDist)}
      runYearProps={parseInt(userInfoProps.userStats[0].runYearDist)}
      runAllProps={parseInt(userInfoProps.userStats[0].runAllTimeDist)}
      swimYearProps={parseInt(userInfoProps.userStats[0].swimYearDist)}
      swimAllProps={parseInt(userInfoProps.userStats[0].swimAllTimeDist)}
    />
  ) : null;

  const userSegmentContent = userInfoProps
    ? userInfoProps.userSegments.map((el, index) => (
        <SegmentSnapshotSmall
          segmentNameProps={el[0].name}
          cityProps={el[0].city}
          stateProps={el[0].state}
          distanceProps={el[0].distance}
          komProps={el[0].kom}
          leaderboardProps={el.segmentTimes}
          uidProps={uidProps}
          userImgProps={userInfoProps.userProfile[0].profileImgUrl}
          key={index}
        />
      ))
    : null;

  return (
    <>
      <section className={classes.dashboard}>
        <div
          className={classes.dashboard_container}
          data-wrapper="max-content-width"
        >
          <div className={classes.dashboard_user}>
            {userInfoContent}
            {userStatsContent}
            <StravaSyncBtn
              uidProps={uidProps}
              userInfoProps={userInfoProps}
              setUserInfoProps={setUserInfoProps}
            />
          </div>
          <div className={classes.dashboard_segment_leaderboard}>
            {userSegmentContent}
          </div>
        </div>
      </section>
    </>
  );
};

export default DesktopDashboard;
