import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './MobileDashboard.module.css';

import UserInfo from '../UserInfo/UserInfo';
import UserStats from '../UserStats/UserStats';
import SegmentSnapshotSmall from '../SegmentSnapshotSmall/SegmentSnapshotSmall';
import StravaSyncBtn from '../StravaSyncBtn/StravaSyncBtn';
import NoSegments from '../NoSegments/NoSegments';

// : REFACTOR WITH DESKTOP DASHBOARD
const MobileDashboard = ({ userInfoProps, uidProps, getUserDataProps }) => {
  const [mdContent, setMdContent] = useState(null);
  const yourStatsContent = (
    <>
      <UserInfo
        userImgProps={userInfoProps.userProfile[0].profileImgUrl}
        firstnameProps={userInfoProps.userProfile[0].firstName}
        lastnameProps={userInfoProps.userProfile[0].lastName}
      />
      <UserStats
        rideYearProps={parseInt(userInfoProps.userStats[0].rideYearDist, 10)}
        rideAllProps={parseInt(userInfoProps.userStats[0].rideAllTimeDist, 10)}
        runYearProps={parseInt(userInfoProps.userStats[0].runYearDist, 10)}
        runAllProps={parseInt(userInfoProps.userStats[0].runAllTimeDist, 10)}
        swimYearProps={parseInt(userInfoProps.userStats[0].swimYearDist, 10)}
        swimAllProps={parseInt(userInfoProps.userStats[0].swimAllTimeDist, 10)}
      />
      <StravaSyncBtn uidProps={uidProps} getUserDataProps={getUserDataProps} />
    </>
  );
  const yourSegmentsContent = (
    <>
      <StravaSyncBtn uidProps={uidProps} getUserDataProps={getUserDataProps} />
      <div className={classes.md_content_grid}>
        {userInfoProps.userSegments.length > 0 ? (
          userInfoProps.userSegments.map((el, index) => (
            <SegmentSnapshotSmall
              segmentNameProps={el[0].name}
              cityProps={el[0].city}
              stateProps={el[0].state}
              distanceProps={el[0].distance}
              elevationHighProps={el[0].elevationHigh}
              elevationLowProps={el[0].elevationLow}
              avgGradeProps={el[0].avgGrade}
              komProps={el[0].kom}
              leaderboardProps={el.segmentTimes}
              uidProps={uidProps}
              userImgProps={userInfoProps.userProfile[0].profileImgUrl}
              key={index}
            />
          ))
        ) : (
          <NoSegments />
        )}
      </div>
    </>
  );

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
              type="button"
              className={classes.md_btn}
              onClick={() => setMdContentHandler('stats')}
            >
              Your Stats
            </button>
            <button
              type="button"
              className={classes.md_btn}
              onClick={() => setMdContentHandler('segments')}
            >
              Your Segments
            </button>
          </nav>
          <div className={classes.md_content}>
            {/* {mdContent ? mdContent : yourStatsContent} */}
            {mdContent || yourStatsContent}
          </div>
        </div>
      </div>
    </section>
  );
};

MobileDashboard.propTypes = {
  userInfoProps: PropTypes.shape({
    userProfile: PropTypes.shape({}),
    userStats: PropTypes.shape({}),
    userSegments: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  uidProps: PropTypes.string.isRequired,
  getUserDataProps: PropTypes.func.isRequired,
};

MobileDashboard.defaultProps = {
  userInfoProps: null,
};

export default MobileDashboard;
