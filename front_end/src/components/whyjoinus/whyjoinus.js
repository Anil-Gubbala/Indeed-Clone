import React, { Component } from 'react';
import axios from 'axios';
class WhyJoinUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios
      .get('http://localhost:8080/company?id=' + '61960b7c79026b0aab6bef86')
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <div>
          <div className="subHeading">About</div>
          <div>
            Google’s mission is to organize the world‘s information and make it universally
            accessible and useful. In 1998, we started with two computer science students in a
            university dorm room and now have thousands of employees in offices around the world. A
            lot has changed since the first Google search engine appeared. But some things haven’t
            changed
          </div>
        </div>
      </>
    );
  }
}

export default WhyJoinUs;
