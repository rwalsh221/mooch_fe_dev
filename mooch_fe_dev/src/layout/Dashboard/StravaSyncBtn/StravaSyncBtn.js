import React, { useState, useEffect } from 'react';
import classes from './StravaSyncBtn.module.css';

const StravaSyncBtn = () => {
  const [btnContent, setBtnContent] = useState('Sync MoOCH with STRAVA');

  const syncWithStrava = async () => {
    try {
      // 1, Set btnContent to spinner
      // 2, send request to php file to sync with strava and set database with api call result
      // 3, set btnContent to sync complete
      // 4, settimeout 5sec to set btnContent back to init
    } catch (error) {
      setBtnContent(error.message);
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
