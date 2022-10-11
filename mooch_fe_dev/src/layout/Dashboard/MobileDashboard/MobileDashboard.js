import React, { useState } from 'react';
import classes from './MobileDashboard.module.css';

import UserInfo from '../UserInfo/UserInfo';
import UserStats from '../UserStats/UserStats';
import SegmentSnapshotSmall from '../SegmentSnapshotSmall/SegmentSnapshotSmall';
import StravaSyncBtn from '../StravaSyncBtn/StravaSyncBtn';

const MobileDashboard = ({ userInfoProps, setUserInfoProps, uidProps }) => {
  console.log(userInfoProps);
  const [mdContent, setMdContent] = useState(null);
  const yourStatsContent = userInfoProps ? (
    <>
      <UserInfo
        userImgProps={userInfoProps.userProfile[0].profileImgUrl}
        firstnameProps={userInfoProps.userProfile[0].firstName}
        lastnameProps={userInfoProps.userProfile[0].lastName}
      />
      <UserStats
        rideYearProps={parseInt(userInfoProps.userStats[0].rideYearDist)}
        rideAllProps={parseInt(userInfoProps.userStats[0].rideAllTimeDist)}
        runYearProps={parseInt(userInfoProps.userStats[0].runYearDist)}
        runAllProps={parseInt(userInfoProps.userStats[0].runAllTimeDist)}
        swimYearProps={parseInt(userInfoProps.userStats[0].swimYearDist)}
        swimAllProps={parseInt(userInfoProps.userStats[0].swimAllTimeDist)}
      />
      <StravaSyncBtn
        uidProps={uidProps}
        userInfoProps={userInfoProps}
        setUserInfoProps={setUserInfoProps}
      />
    </>
  ) : null;

  const yourSegmentsContent = userInfoProps ? (
    <>
      <StravaSyncBtn
        uidProps={uidProps}
        userInfoProps={userInfoProps}
        setUserInfoProps={setUserInfoProps}
      />
      <div className={classes.md_content_grid}>
        {userInfoProps.userSegments.map((el, index) => (
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
        ))}
      </div>
    </>
  ) : null;

  console.log(mdContent);
  const setMdContentHandler = (content) => {
    if (content === 'stats') {
      setMdContent(yourStatsContent);
    } else {
      setMdContent(yourSegmentsContent);
    }
  };
  return (
    <section className={classes.md_dashboard}>
      <div data-wrapper="max-content-width">
        <div className={classes.md_container}>
          <nav className={classes.md_nav}>
            <button
              className={classes.md_btn}
              onClick={() => setMdContentHandler('stats')}
            >
              Your Stats
            </button>
            <button
              className={classes.md_btn}
              onClick={() => setMdContentHandler('segments')}
            >
              Your Segments
            </button>
          </nav>
          <div className={classes.md_content}>
            {mdContent ? mdContent : yourStatsContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileDashboard;
