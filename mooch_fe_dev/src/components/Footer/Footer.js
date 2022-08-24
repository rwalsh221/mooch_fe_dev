import React from 'react';
import classes from './Footer.module.css';

const Footer = () => (
  <footer className={classes.footer_container}>
    <div>
      <p className={classes.footer_logo} data-heading="logo-small">
        MoOCH
      </p>
      <p className={classes.footer_copyright}>&copy;&nbsp;2022 MoOCH</p>
    </div>
    <div className={classes.footer_content}>
      <h5>menu</h5>
      <ul className={classes.footer_list__menu}>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
        <li>Lorem</li>
      </ul>
    </div>
    <div className={classes.footer_content}>
      <h5>follow</h5>
      <ul className={classes.footer_list__social}>
        <li>
          <span className="material-icons" data-font="icon">
            facebook
          </span>
          facebook
        </li>
        <li>
          <span className="material-icons" data-font="icon">
            pix
          </span>
          instagram
        </li>
        <li>
          <span className="material-icons" data-font="icon">
            flutter_dash
          </span>
          twitter
        </li>
        <li>
          <span className="material-icons" data-font="icon">
            youtube_searched_for
          </span>
          youtube
        </li>
        <li>
          <span className="material-icons" data-font="icon">
            link
          </span>
          linkedin
        </li>
      </ul>
    </div>
    <div className={classes.footer_content}>
      <h5>get started</h5>
      <ul>
        <li>sign up</li>
        <li>log in</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
