import React, { Component } from "react";
import "./snapshot.css";
import ceo from "../../images/ceo.jpeg";
import axios from "axios";

class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: "",
      ceo: "",
      companySize: "",
      companyType: "",
      culture: "",
      description: "",
      founded: "",
      headquaters: "",
      image: "",
      industry: "",
      location: "",
      mission: "",
      name: "",
      revenue: "",
      values: "",
      id: "",
      website: "",
      companyName: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/company?id=" + "61960b7c79026b0aab6bef86")
      .then((response) => {
        console.log(response.data);
        var mydate = new Date(response.data.founded);
        this.setState({
          about: response.data.about,
          ceo: response.data.ceo,
          companySize: response.data.companySize,
          companyType: response.data.companyType,
          culture: response.data.culture,
          description: response.data.description,
          founded: response.data.founded,
          headquaters: response.data.headquaters,
          image: response.data.image,
          industry: response.data.industry,
          location: response.data.location,
          mission: response.data.mission,
          name: response.data.name,
          revenue: response.data.revenue,
          values: response.data.values,
          id: response.data._id,
          website: response.data.website,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div>
          <label className="componenttag">
            {this.state.companyName} Careers and Employment
          </label>
          <div>
            <div className="subHeading">Work happiness</div>
            <div className="">
              <div className="col-md-3 "></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div>
            <div className="subHeading">About the company</div>
            <div className="row" style={{ marginTop: "35px" }}>
              <div className="col-md-2 ">
                <img src={ceo} className="ceo1" alt="CEO Image" />
              </div>
              <div
                className="col-md-10"
                style={{ marginTop: "0px", paddingTop: "0px !important" }}
              >
                <ul className="detailsBox row" style={{ marginTop: "-10px" }}>
                  <li className="box">
                    <div class="libox1">CEO</div>
                    <div class="libox2">{this.state.ceo}</div>
                  </li>
                  <li className="box">
                    <div className="libox1">Founded</div>
                    <div className="libox2">{this.state.founded}</div>
                  </li>
                  <li className="box">
                    <div className="libox1">company size</div>
                    <div className="libox2">{this.state.companySize}</div>
                  </li>
                  <li className="box">
                    <div className="libox1">Revenue</div>
                    <div className="libox2">$ {this.state.revenue} (USD)</div>
                  </li>
                </ul>
                <ul>
                  <li className="box" style={{ marginLeft: "-5px" }}>
                    <div className="libox1">Industry</div>
                    <div className="libox2">{this.state.industry}</div>
                  </li>
                </ul>
                <div>This is all text</div>
              </div>
            </div>
          </div>
          <div>
            <div className="subHeading">Jobs near you</div>
            <div>You're seeing Google jobs close to San Jose, CA.</div>
            <div className="nearJobs">
              <div className="nearJobs1">
                <div style={{ display: "flex" }}>
                  <div style={{ width: "500px" }}>sai</div>
                  <div style={{ width: "400px" }}>sai</div>
                  <div style={{ width: "400px" }}>sai</div>
                </div>
                {/* <div>sai</div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="subHeading">Salaries</div>
            <div>
              Salary estimated from 35.5K employees, users, and past and present
              job advertisements on Indeed.
            </div>
          </div>
          <div>
            <div className="subHeading">Reviews</div>
            <div>Map List of Reviews</div>
          </div>
        </div>
      </>
    );
  }
}

export default Snapshot;
