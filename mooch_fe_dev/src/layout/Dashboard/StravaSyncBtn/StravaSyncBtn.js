import React, { useState } from 'react';
import classes from './StravaSyncBtn.module.css';

const StravaSyncBtn = ({ uidProps, userInfoProps, setUserInfoProps }) => {
  const [btnContent, setBtnContent] = useState('Sync MoOCH with STRAVA');

  const syncWithStrava = async () => {
    try {
      // 1, Set btnContent to spinner
      // 2, send request to php file to sync with strava and set database with api call result
      const response = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/set/?userId=${uidProps}`
      );

      if (response.ok) {
        setBtnContent('synching');
        // setSyncProps(true);
        const getUserStats = await fetch(
          `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/?userId=${uidProps}`
        );

        const getUserStatsJson = await getUserStats.json();
        setUserInfoProps({
          userProfile: { ...userInfoProps.userProfile },
          userStats: getUserStatsJson,
        });
      } else {
        throw new Error();
      }
      setBtnContent('Sync MoOCH with STRAVA');
      // 3, set btnContent to sync complete
      // 4, settimeout 5sec to set btnContent back to init
    } catch (error) {
      setBtnContent('error.message');
      console.error(error);
    }
  };

  return (
    <button onClick={syncWithStrava} className={classes.strava_sync_btn}>
      {btnContent}
    </button>
  );
};

export default StravaSyncBtn;
