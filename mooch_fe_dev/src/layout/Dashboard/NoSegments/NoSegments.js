import React from 'react';
import classes from './NoSegments.module.css';

const NoSegments = () => (
  <div className={classes.no_segments}>
    <h2>YOU DO NOT HAVE ANY SEGMENTS</h2>
    <p>
      please sync&nbsp;<span data-heading="logo-small">MoOCH</span> with&nbsp;
      <span data-heading="logo-strava">STRAVA</span>
    </p>
  </div>
);

export default NoSegments;
