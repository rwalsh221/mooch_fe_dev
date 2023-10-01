import React from 'react';
import PropTypes from 'prop-types';
import classes from './DesktopDashboard.module.css';

import UserInfo from '../UserInfo/UserInfo';
import UserStats from '../UserStats/UserStats';
import SegmentSnapshotSmall from '../SegmentSnapshotSmall/SegmentSnapshotSmall';
import StravaSyncBtn from '../StravaSyncBtn/StravaSyncBtn';

const DesktopDashboard = ({ userInfoProps, uidProps, getUserDataProps }) => {
  // TODO: USERSEGMENTCONTENT
  // TODO: create seperate compoent for new user no segments
  const userInfoContent = userInfoProps ? (
    <UserInfo
      userImgProps={userInfoProps.userProfile[0].profileImgUrl}
      firstnameProps={userInfoProps.userProfile[0].firstName}
      lastnameProps={userInfoProps.userProfile[0].lastName}
    />
  ) : null;

  const userStatsContent = userInfoProps ? (
    <UserStats
      rideYearProps={parseInt(userInfoProps.userStats[0].rideYearDist, 10)}
      rideAllProps={parseInt(userInfoProps.userStats[0].rideAllTimeDist, 10)}
      runYearProps={parseInt(userInfoProps.userStats[0].runYearDist, 10)}
      runAllProps={parseInt(userInfoProps.userStats[0].runAllTimeDist, 10)}
      swimYearProps={parseInt(userInfoProps.userStats[0].swimYearDist, 10)}
      swimAllProps={parseInt(userInfoProps.userStats[0].swimAllTimeDist, 10)}
    />
  ) : null;
  const userSegmentContent = () => {
    if (!userInfoProps) {
      return null;
    }
    if (userInfoProps.userSegments.length !== 0) {
      return userInfoProps.userSegments.map((el, index) => (
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
      ));
    }
    return <SegmentSnapshotSmall newUserProps />;
  };

  return (
    <section className={classes.dashboard}>
      <div data-wrapper="max-content-width">
        <div className={classes.dashboard_container}>
          <div className={classes.dashboard_user}>
            {userInfoContent}
            {userStatsContent}
            <StravaSyncBtn
              uidProps={uidProps}
              getUserDataProps={getUserDataProps}
              btnTypeProps="button"
            />
          </div>
          <div className={classes.dashboard_segment_leaderboard}>
            {userSegmentContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

DesktopDashboard.propTypes = {
  userInfoProps: PropTypes.shape({
    userProfile: PropTypes.shape({}),
    userStats: PropTypes.shape({}),
    userSegments: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  uidProps: PropTypes.string.isRequired,
  getUserDataProps: PropTypes.func.isRequired,
};

DesktopDashboard.defaultProps = {
  userInfoProps: null,
};

export default DesktopDashboard;
