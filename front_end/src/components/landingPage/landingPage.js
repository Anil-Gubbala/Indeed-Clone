import React, { Component } from 'react';
import { Redirect } from 'react-router';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class LandingPage extends React.Component {
  state = {};

  render() {
    return (
      <>
        <p>This is a page</p>
      </>
    );
  }
}

export default LandingPage;
