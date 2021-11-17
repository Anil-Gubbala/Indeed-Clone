import React, { Component } from 'react';
import { Redirect } from 'react-router';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import './landingPage.css';

dotenv.config();

const { TabPane } = Tabs;
class LandingPage extends React.Component {
  state = {};

  render() {
    function callback(key) {
      switch (key) {
        case '1':
          console.log('one called');
          break;
        case '2':
          console.log('two called');
          break;
        case '3':
          console.log('three called');
          break;
      }
    }
    return (
      <>
        <p>This is a page</p>
        <div
          style={{
            paddingLeft: '25%',
            paddingRight: '25%',
            position: 'absolute',
          }}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Snapshot" key="1"></TabPane>
            {/* <div style={{ width: '200px' }}></div> */}
            <TabPane tab="Why Join Us" key="2"></TabPane>
            <TabPane tab="Salaries" key="4"></TabPane>
            <TabPane tab="Photos" key="5"></TabPane>
            <TabPane tab="Jobs" key="6"></TabPane>
          </Tabs>
        </div>
        <div className="horizontalRule"></div>
        {/* <hr style={{ margin: '0px !important' }}></hr> */}
      </>
    );
  }
}

export default LandingPage;
