import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StravaSyncBtn.module.css';
// import MoochLogo from '../../../components/Typography/MoochLogo/MoochLogo';

const StravaSyncBtn = ({ uidProps, getUserDataProps }) => {
  const [btnContent, setBtnContent] = useState(`Sync MoOCH with STRAVA`);

  const syncWithStrava = async () => {
    try {
      // 1, Set btnContent to spinner
      setBtnContent('Syncing with STRAVA');
      // 2, send request to php file to sync with strava and set database with api call result
      const statsResponse = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/athlete/stats/set?userId=${uidProps}`
      );

      const segmentsResponse = await fetch(
        `${process.env.REACT_APP_MOOCH_API_URL}/segments/set?userId=${uidProps}`
      );

      if (statsResponse.ok && segmentsResponse.ok) {
        setBtnContent('Syncing with MoOCH');
        await getUserDataProps();
      } else {
        throw new Error();
      }
      // 3, set btnContent to sync complete
      setBtnContent('MoOCH STRAVA sync complete');

      // 4, settimeout 5sec to set btnContent back to init
      setTimeout(() => {
        document.querySelector('#strava_sync_btn').blur();
        setBtnContent('Sync MoOCH with STRAVA');
      }, 5000);
    } catch (error) {
      setBtnContent('error.message');
      console.error(error);
    }
  };

  return (
    <button
      id="strava_sync_btn"
      type="button"
      onClick={syncWithStrava}
      className={classes.strava_sync_btn}
    >
      {btnContent}
    </button>
  );
};

StravaSyncBtn.propTypes = {
  uidProps: PropTypes.string.isRequired,
  getUserDataProps: PropTypes.func.isRequired,
};
export default StravaSyncBtn;
