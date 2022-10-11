import React from 'react';
import classes from './MobileDashboard.module.css';

const MobileDashboard = () => {
  return (
    <section>
      <nav className={classes.md_nav}>
        <button>Your Stats</button>
        <button>Your Segments</button>
      </nav>
      <div className={classes.md_content}></div>
    </section>
  );
};

export default MobileDashboard;
