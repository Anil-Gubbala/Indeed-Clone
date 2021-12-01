import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import timeDifference from '../../utils/timeDifference';
import ApplyModal from '../layout/ApplyModal';
import useStyles from './myjobsElements';

function SavedJobs(props) {
  const classes = useStyles();
  const [savedjobs, setSavedJobs] = useState([]);
  const [Appliedjobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`/jobApplicationstatus`, { params: { id: '61765e2cac3f02c79a885221' } })
      .then((response) => {
        setSavedJobs(response.data.Savedjobs);
        setAppliedJobs(response.data.Appliedjobs);
        console.log(response.data);
        console.log(savedjobs);
        console.log(Appliedjobs);
      });
  }, []);

  return (
    <Container style={{ padding: '100px 10vw', display: 'flex' }}>
      <Box>
        <Typography variant="h5" style={{ fontSize: '40px', marginBottom: '20px' }}>
          My Jobs
        </Typography>
        <ul style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <NavLink
              to="/savedjobs"
              activeStyle={{
                color: '#0145E3',
                textDecoration: 'underline',
              }}
              style={{
                fontSize: '25px',
                marginRight: '30px',
              }}
            >
              Saved
              <span className="count countdisplay"> {savedjobs.length}</span>
            </NavLink>
          </div>
          <NavLink
            to="/appliedjobs"
            style={{
              fontSize: '25px',
            }}
          >
            Applied
            <span className="count countdisplay"> {Appliedjobs.length}</span>
          </NavLink>
        </ul>
        <Box>
          {savedjobs?.map((key) => (
            <Box style={{ display: 'flex' }} key={key}>
              <Box style={{ width: '500px' }}>
                <Typography variant="h5" style={{ fontSize: '18px', marginBottom: '15px' }}>
                  {key.jobId.jobTitle}
                </Typography>
                <Box style={{ marginBottom: '2px', fontWeight: '600', color: 'grey' }}>
                  {key.jobId.companyName}
                </Box>
                <Box style={{ marginBottom: '2px', fontWeight: '600', color: 'grey' }}>
                  {key.jobId.location.city} , {key.jobId.location.state}
                </Box>
                <Box
                  style={{
                    marginBottom: '30px',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'grey',
                  }}
                >
                  Saved today
                  {/* Saved {timeDifference(savedjobs[key].dateSaved)} */}
                </Box>
              </Box>
              <Box style={{ display: 'flex' }}>
                <Button className={classes.applyButton}>Apply now</Button>
                <Button className={classes.updateButton}>Update status</Button>
              </Box>
            </Box>
          ))}
        </Box>
        {/* <ApplyModal
          open={open}
          handleClose={() => handleClose()}
          // jobId={jobId}
          handleApply={() => handleApply()}
        /> */}
      </Box>
    </Container>
  );
}

export default SavedJobs;
