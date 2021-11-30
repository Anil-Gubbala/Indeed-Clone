import { Grid, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './profile.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MdUpload, MdModeEdit } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

function Profile() {
  const Input = styled('input')({
    display: 'none',
  });
  return (
    <container>
      <container className="profile__main__container">
        <div className="profile-main">
          <div className="circle">
            <div style={{ margin: 15 }}>
              <h2>JM</h2>
            </div>
          </div>
          <div style={{ margin: 15 }}>
            <h2>Jahnavi Marthala</h2>
          </div>
        </div>
      </container>
      <container className="profile__body__container">
        <Card
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-start',
            marginBottom: 10,
            width: 600,
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
            >
              <h3>Get started</h3>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="application/pdf"
                    id="contained-button-file"
                    multiple
                    type="file"
                    display="none"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      borderRadius: '25px',
                      backgroundColor: 'white',
                      color: '#1150bf',
                      border: '2px solid #1150bf',
                    }}
                  >
                    <MdUpload style={{ fontSize: '1.5rem', color: '#1150bf' }} />
                    Upload a Resume
                  </Button>
                </label>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="application/pdf"
                    id="contained-button-file"
                    multiple
                    type="file"
                    display="none"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      borderRadius: '25px',
                      backgroundColor: 'white',
                      color: '#1150bf',
                      border: '2px solid #1150bf',
                    }}
                  >
                    Build a Resume
                  </Button>
                </label>
              </Stack>
              {/* </container> */}
              <div style={{ marginTop: '10px' }}>
                By continuing, you agree to create a{' '}
                <a href="https://hrtechprivacy.com/brands/indeed#s4-4">public resume</a> and agree
                to receiving job opportunities from employers.
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            margin: 10,
            width: 600,
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
                margin: 10,
                flexDirection: 'column',
              }}
            >
              <container>
                <div className="profile_contact">
                  <h3>Contact Information</h3>
                  <MdModeEdit style={{ justifyContent: 'flex-end' }} />
                </div>
                {/* <div>Jahnavi Marthala</div>
                <div>
                  mjahnavi1995@gmail.com
                  <IoIosLock />
                </div>
                <div>
                  <h5>Add phone number</h5>
                </div> */}
                <span className="required">*</span>Required fields
                <div>
                  <label htmlFor="fname" style={{ fontWeight: '700' }}>
                    First Name <span className="required">*</span>
                  </label>
                  <br />
                  <input type="text" id="fname" name="fname" value="John" />
                  <br />
                  <label htmlFor="lname" style={{ fontWeight: '700' }}>
                    Last Name <span className="required">*</span>
                  </label>
                  <br />
                  <input type="text" id="lname" name="lname" value="Doe" />
                  <br />
                  <br />
                  <div>
                    Email Address <IoIosLock /> only provided to employers you apply or respond to.
                  </div>
                  <div>mjahnavi1995@gmail.com</div>
                  <br />
                  <div>
                    Phone Number(optional) <IoIosLock /> only provided to employers you apply or
                    respond to.
                  </div>
                  <div>+13108036455</div>
                  <br />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Button
                      variant="contained"
                      component="span"
                      style={{
                        borderRadius: '25px',
                        backgroundColor: '#1150bf',
                        color: '#ffff',
                        border: '2px solid #1150bf',
                        height: '45px',
                      }}
                    >
                      Save
                    </Button>
                    <Button style={{ margin: '10px' }}>Cancel</Button>
                  </div>
                </div>
              </container>
            </div>
          </Card.Body>
        </Card>
        <Card
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            margin: 10,
            width: 600,
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
                margin: 10,
                flexDirection: 'column',
              }}
            >
              <div className="profile_contact">
                <h3>Job preferences</h3>
                <MdModeEdit style={{ justifyContent: 'flex-end' }} />
              </div>
              <div>
                Save specific details like desired pay and schedule that help us match you with
                better jobs
              </div>
            </div>
          </Card.Body>
        </Card>
        <Grid
          container
          spacing={1}
          style={{
            fontSize: '14px',
            backgroundColor: 'white',
            padding: '15px 10px',
            margin: '0 -20px ',
          }}
        >
          <Grid item style={{ cursor: 'pointer' }}>
            © 2021 Indeed
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: 'pointer' }}>
            Cookies, Privacy and Terms
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: 'pointer' }}>
            Do Not Sell My Personal Information
          </Grid>
        </Grid>
      </container>
    </container>
  );
}

export default Profile;
