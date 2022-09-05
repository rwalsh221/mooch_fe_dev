import React from 'react';
import classes from './ActivityCard.module.css';

import userImg from '../../../assets/img/forest_bg.jpg';

const ActivityCard = () => (
  <div className={classes.activity_card}>
    <div className={classes.activity_card__user}>
      <div className={classes.user_img}>
        <img src={userImg} alt={'user'} />
      </div>
      <div className={classes.user_name}>
        <p>Richard</p>
        <p data-card-style="title">date at time&sdot; location,location</p>
      </div>
    </div>
    <div className={classes.activity_card__content}>
      <div className={classes.content_icon}>
        <span className="material-icons" data-font="icon">
          pedal_bike
        </span>
      </div>
      <div className={classes.content_stats}>
        <h2>Activity Name</h2>
        <div>
          <div>
            <p data-card-style="title">Distance</p>
            <p data-card-style="total">36.37km</p>
          </div>
          <div>
            <p data-card-style="title">elev gain</p>
            <p data-card-style="total">495m</p>
          </div>
          <div>
            <p data-card-style="title">time</p>
            <p data-card-style="total">2h:35m</p>
          </div>
          <div className={classes.content_stats__achievements}>
            <p data-card-style="title">achievements</p>

            <p data-card-style="total">
              <span className="material-icons" data-font="icon">
                emoji_events
              </span>
              &nbsp;12
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.activity_card__map}>
      <div>map</div>
    </div>
  </div>
);

export default ActivityCard;
