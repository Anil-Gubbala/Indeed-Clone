import React, { Component } from 'react';
import { Redirect } from 'react-router';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import './companyHome.css';
import google from '../../images/google.jpeg';
import g from '../../images/g.jpeg';
import Snapshot from '../snapshot/snapshot';

dotenv.config();

const { TabPane } = Tabs;
class companyHome extends React.Component {
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
        <div
          style={{
            paddingLeft: '25%',
            paddingRight: '25%',
            position: 'absolute',
            width: '100%',
          }}
        >
          <img src={google} style={{ marginTop: '-15px' }} alt="Company Image" />
          <div className="row" style={{ paddingBottom: '15px' }}>
            <div className="col-md-1" style={{ paddingLeft: '20px' }}>
              <img src={g} className="companyLogo" alt="Company Logo" />
            </div>
            <div className="col-md-2 " style={{ paddingLeft: '45px' }}>
              <div className="row companytxt">Google</div>
              <div className="row"></div>
            </div>
          </div>
          <div className="row" style={{ marginLeft: '10px' }}>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              indicatorColor="secondary"
              style={{ width: '100%' }}
            >
              <TabPane tab="Snapshot" key="1">
                <Snapshot />
              </TabPane>
              <TabPane tab="Why Join Us" key="2"></TabPane>
              <TabPane tab="Reviews" key="3"></TabPane>
              <TabPane tab="Salaries" key="4"></TabPane>
              <TabPane tab="Photos" key="5"></TabPane>
              <TabPane tab="Jobs" key="6"></TabPane>
            </Tabs>
          </div>
        </div>
        <div className="horizontalRule"></div>
        {/* <hr style={{ margin: '0px !important' }}></hr> */}
      </>
    );
  }
}

export default companyHome;
