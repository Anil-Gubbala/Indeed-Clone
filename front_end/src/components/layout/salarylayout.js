import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Card, Col, Container, Row } from 'react-bootstrap';
import StarIcon from '@material-ui/icons/Star';
import useStyles from './companyBoxElements';
import g from '../../images/g.jpeg';

function SalaryLayout() {
  const classes = useStyles();
  const name = 'Google';

  const rating = 4.5;
  const id = 4;
  return (
    <container>
      <div className="rankedlist">
        <div className="contentcontainer">
          <div className="logo">
            <div className="image">
              <img
                alt="logo"
                src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/128x128/9d957ded6f74ee20d805109548fb36e8"
              />
            </div>
          </div>
          <div className="itemtitle">
            <div className="titletext">
              <a className="name" href="/cmp/Apple">
                Apple
              </a>
            </div>
          </div>
        </div>
      </div>
    </container>
  );
}

export default SalaryLayout;
