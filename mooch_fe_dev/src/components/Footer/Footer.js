import React from 'react';
import classes from './Footer.module.css';

const Footer = () => (
  <footer className={classes.footer_container}>
    <div>
      <p className={classes.footer_logo}>MoOCH</p>
      <p>&copy;2022 MoOCH</p>
    </div>
    <div>
      <h5 className={classes.footer_heading}>menu</h5>
      <ul>
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
    <div>
      <h5 className={classes.footer_heading}>follow</h5>
      <ul>
        <li>facebook</li>
        <li>instagram</li>
        <li>twitter</li>
        <li>youtube</li>
        <li>linkedin</li>
      </ul>
    </div>
    <div>
      <h5 className={classes.footer_heading}>get started</h5>
      <ul>
        <li>sign up</li>
        <li>log in</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
