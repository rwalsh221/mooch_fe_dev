import React, { useState } from 'react';
import classes from './StravaSyncBtn.module.css';

const StravaSyncBtn = ({ uidProps, getUserDataProps }) => {
  const [btnContent, setBtnContent] = useState('Sync MoOCH with STRAVA');
  console.log(getUserDataProps);
  const syncWithStrava = async () => {
    try {
      // 1, Set btnContent to spinner
      setBtnContent('Syncing with STRAVA');
      // 2, send request to php file to sync with strava and set database with api call result
      const statsResponse = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/set/?userId=${uidProps}`
      );

      const segmentsResponse = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/segments/set/?userId=${uidProps}`
      );

      if (statsResponse.ok && segmentsResponse.ok) {
        setBtnContent('Syncing with MoOCH');
        await getUserDataProps();
      } else {
        throw new Error();
      }
      setBtnContent('MoOCH STRAVA sync complete');

      setTimeout(() => {
        setBtnContent('Sync MoOCH with STRAVA');
      }, 5000);
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
