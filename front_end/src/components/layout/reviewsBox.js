import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Card, Col, Container, Row } from 'react-bootstrap';
import StarIcon from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import useStyles from './companyBoxElements';
import g from '../../images/g.jpeg';

function ReviewBox(props) {
  console.log(props.description);
  const classes = useStyles();
  const name = 'Google';

  const rating = 4.5;
  const id = 4;
  return (
    <container>
      <Card
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          width: '1000px',
          height: 'auto',
          flexFlow: 'wrap',
          borderRadius: 20,
          marginTop: '20px',
        }}
      >
        <Card.Body>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              height: 'auto',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-1" style={{ paddingLeft: '20px' }}>
              <img src={g} className="companyLogo" alt="Company Logo" />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '30px',
                justifyContent: 'flex-start',
              }}
            >
              <div>{props.name}</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div>
                  <u>3.5</u>
                </div>
                <StarIcon style={{ color: '#9d2b6b' }} />
              </div>
            </div>
            <div style={{ display: 'flex', paddingLeft: '15px', width: '500px' }}>
              <div>{props.description}</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '15px',
              }}
            >
              <a style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <u>Reviews</u>
              </a>
              <a style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <u>Salaries</u>
              </a>
              <a style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <u>Jobs</u>
              </a>
            </div>
          </div>
        </Card.Body>
      </Card>
    </container>
  );
}

export default ReviewBox;
