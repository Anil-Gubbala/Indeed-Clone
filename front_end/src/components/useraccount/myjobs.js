import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import timeDifference from '../../utils/timeDifference';
import ApplyModal from '../layout/ApplyModal';
import useStyles from './myjobsElements';
import DashLoginNav from '../navbar/DashLoginNav';
import { get, post } from '../../utils/serverCall';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function SavedJobs(props) {
  const classes = useStyles();
  const [savedjobs, setSavedJobs] = useState([]);
  const [Appliedjobs, setAppliedJobs] = useState([]);
  const [save, setsave] = useState("false");
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  useEffect(() => {
  
      get(`/jobApplicationstatus`, { id: localStorage.getItem("userId") })
      .then((response) => {
        setSavedJobs(response.Savedjobs);
        setAppliedJobs(response.Appliedjobs);
        setsave(true);
      });
  }, []);

 
 

  return (
    <div>
      <DashLoginNav/>
    <Container style={{ padding: '100px 10vw', display: 'flex' }}>
     
      <Box>
        <Typography variant="h5" style={{ fontSize: '40px', marginBottom: '20px' }}>
          My Jobs
        </Typography>
        
    <Tabs>
    <TabList>
      <Tab><b style = {{color: '#1890ff'}}>Saved {savedjobs.length}</b></Tab>
      <Tab><b style = {{color: '#1890ff'}}>Applied {Appliedjobs.length}</b></Tab>
    </TabList>
    <div style = {{marginTop: '25'}}>

    </div>
    <TabPanel>
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
       </TabPanel>
        <TabPanel>
        <Box>
          {Appliedjobs.map((key) => (
            <>
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
                    Applied
                  </Box>
                </Box>
                <Box style={{ display: 'flex' }}>
                  <Button className={classes.applyButton}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </Box>
        </TabPanel>
        </Tabs>
      </Box>
    </Container>
    </div>
  );
}

export default SavedJobs;
