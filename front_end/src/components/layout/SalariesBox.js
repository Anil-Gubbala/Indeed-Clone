import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Card, Col, Container, Row } from 'react-bootstrap';
import StarIcon from '@material-ui/icons/Star';
import useStyles from './companyBoxElements';
import g from '../../images/g.jpeg';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

function SalaryBox(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <container>
      <Card
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          width: '50%',
          height: 'auto',
          flexFlow: 'wrap',
          borderRadius: 20,
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <img src={g} alt={name} width="50px" style={{ marginLeft: '10px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <b>
                <div><Link to={"/companyHomes?id="+ props.id}>{props.name}</Link></div>
                </b>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                }}
              >
                <h5 style={{ paddingRight: '10px', paddingLeft: '10px' }}>{props.rating}</h5><Rating value={props.rating} readOnly style={{ color: '#9d2b6b' }} />
                <div style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <Link to={"/companyHomes?id="+ props.id+"&tab=3"}>{props.count} reviews</Link>
                  
                </div>
                <div style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                <Link to={"/companyHomes?id="+ props.id+"&tab=4"}> 3 salaries reported</Link>
                 
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>${props.avg}</div>
              <div>per year</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </container>
  );
}

export default SalaryBox;
