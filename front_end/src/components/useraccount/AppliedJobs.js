import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  applyButton: {
    color: 'black',
    width: '200px',
    height: '40px',
    borderRadius: '50px',
    border: '2px solid #0145E3',
    marginRight: '2%',
  },
  updateButton: {
    color: '#0145E3',
    width: '200px',
    height: '40px',
    border: '2px solid #909090',
    borderRadius: '50px',
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function AppliedJobs(props) {
  const classes = useStyles();
  const [savedjobs, setSavedJobs] = useState([]);
  const [Appliedjobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`/jobApplicationstatus`, { params: { id: '61765e2cac3f02c79a885222' } })
      .then((response) => {
        setSavedJobs(response.data.Savedjobs);
        setAppliedJobs(response.data.Appliedjobs);
      });
  }, []);
  return (
    <Container style={{ padding: '100px 10vw', display: 'flex' }}>
      <Box>
        <Typography variant="h5" style={{ fontSize: '40px', marginBottom: '20px' }}>
          My Jobs
        </Typography>
        <ul style={{ display: 'flex', marginBottom: '20px' }}>
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
            Saved <span className="count countdisplay"> {savedjobs.length}</span>
          </NavLink>
          <NavLink
            to="/appliedjobs"
            activeStyle={{
              color: '#0145E3',
              textDecoration: 'underline',
            }}
            style={{
              fontSize: '25px',
              marginRight: '30px',
            }}
          >
            Applied <span className="count countdisplay"> {Appliedjobs.length}</span>
          </NavLink>
        </ul>

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
                  <Button className={classes.applyButton} onClick={() => handleOpen(key)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default AppliedJobs;
