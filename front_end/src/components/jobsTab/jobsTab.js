import React, { Component } from "react";
import "./jobsTab.css";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";

class JobsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      what: "",
      where: "",
      allJobs: [],
      jobsFromDB: [],
      selectedJob: "",
    };
  }

  componentDidMount() {
    get("/jobbycompanyid?id=" + "61960b7c79026b0aab6bef86")
      .then((response) => {
        console.log(response);
        this.setState({ allJobs: response });
        this.setState({ jobsFromDB: response });
        this.setState({ selectedJob: response[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  filterJobs = () => {
    // console.log(this.state.where);

    if (this.state.where == "" && this.state.what == "") {
      this.setState({
        allJobs: this.state.jobsFromDB,
        selectedJob: this.state.jobsFromDB[0],
      });
    } else {
      let arr = [];
      arr = this.state.jobsFromDB.filter((job) => {
        return (
          (job.location.city == this.state.where ||
            job.location.state == this.state.where ||
            this.state.where == "") &&
          (job.jobTitle == this.state.what ||
            job.role == this.state.what ||
            this.state.what == "")
        );
      });
      this.setState({ allJobs: arr, selectedJob: arr[0] });
    }
  };

  changeJob = (job) => {
    this.setState({ selectedJob: job });
  };

  renderJobs = () => {
    return (
      <>
        {this.state.allJobs.map((job) => {
          return (
            <>
              <div
                className="jobclick"
                style={{
                  padding: "20px",
                  paddingBottom: "30px",
                  paddingTop: "15px",
                }}
                onClick={() => this.changeJob(job)}
              >
                <div style={{ fontSize: "17px", fontWeight: "700" }}>
                  {job.role}, {job.jobTitle}
                </div>
                <div style={{ color: "#4B4B4B" }}>
                  {job.location.city}, {job.location.state} - {job.location.zip}
                </div>
              </div>
              <hr className="hrPadding"></hr>
            </>
          );
        })}
      </>
    );
  };

  renderJobDescription = () => {
    let job = this.state.selectedJob;
    return (
      <>
        {job == {} || job == undefined ? (
          <div></div>
        ) : (
          <>
            <div
              className="redborder"
              style={{
                paddingLeft: "20px",
                border: "1px solid #f2f2f2",
                borderBottom: "0px",
                paddingTop: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src=""
                    alt="logo"
                    style={{ height: "48px", width: "48px" }}
                  ></img>
                </div>
                <div style={{ marginLeft: "25px" }}>
                  <div style={{ fontSize: "22px" }}>
                    {job.role}, {job.jobTitle}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "400" }}>
                    {job.companyName} - {job.location.city},{" "}
                    {job.location.state}
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "left",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <button
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  className="aplbtn"
                >
                  Apply
                </button>
              </div>
            </div>
            <hr className="hrPadding"></hr>
            <div
              className="jobdescscrl"
              style={{ padding: "20px", border: "1px solid #f2f2f2" }}
            >
              <div>
                <label>Minimum qualifications:</label>
                <br />
                <label style={{ fontWeight: "350", fontSize: "14px" }}>
                  {job.need}
                </label>
              </div>

              <div className="m15">
                <label>Work Culture</label>
                <br />
                <label style={{ fontWeight: "350", fontSize: "14px" }}>
                  {job.work}
                </label>
              </div>
              <div className="m15">
                <label>Compensation</label>
                <br />
                <label style={{ fontWeight: "350", fontSize: "14px" }}>
                  $ {job.salary} (USD)
                </label>
              </div>
              <div className="m15">
                <label>Preferred qualifications:</label>
                <br />
                <label style={{ fontWeight: "350", fontSize: "14px" }}>
                  <ul>
                    <li>
                      You have a passion for meticulously crafted interfaces
                      that strike the correct balance between ease-of-use,
                      elegance, and power.
                    </li>
                    <li>
                      Comfortability working in the iOS or Android ecosystem.
                      For iOS we primarily use Swift 5, and leverage Apple’s
                      best practices for UI development. For Android, we use
                      (Java, Android Studio, Gradle, adb, Linux).
                    </li>
                    <li>
                      You have a passion for meticulously crafted interfaces
                      that strike the correct balance between ease-of-use,
                      elegance, and power.
                    </li>
                    <li>
                      Ability to create tools and automate your workflows using
                      Python scripts
                    </li>
                    <li>
                      You appreciate the value of code-review and other
                      collaborative development practices.
                    </li>
                    <li>
                      Should be able to lead the Data Ingestion project in the
                      Cloud environment. Should be conversant in Waterfall,
                      Scrum-based software development methodologies.
                    </li>
                    <li>
                      Must have written Business Requirement and Functional
                      Requirement document in the past projects.
                    </li>
                    <li>
                      Understanding of data center server and networking
                      infrastructure at a high level.
                    </li>
                    {/* ................ */}
                  </ul>
                </label>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  render() {
    return (
      <>
        <div>
          <div className="subHeading stick">Google Jobs</div>
          <div style={{ display: "flex" }}>
            <div className="col-md-5" style={{ paddingLeft: "0px" }}>
              <div className="shead">what</div>
              <div className="sSub">job title, keywords</div>
              <div>
                <input
                  className="jobtxt"
                  value={this.state.what}
                  onChange={(e) => this.setState({ what: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="col-md-5" style={{ paddingLeft: "0px" }}>
              <div className="shead">where</div>
              <div className="sSub">city, state, or zip</div>
              <div>
                <input
                  className="jobtxt"
                  value={this.state.where}
                  onChange={(e) => this.setState({ where: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="col-md-2" style={{ paddingLeft: "0px" }}>
              <button className="jobbtn" onClick={this.filterJobs}>
                Find Jobs
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div className="col-md-4" style={{ border: "1px solid #f2f2f2" }}>
            {this.state.allJobs == [] ? (
              <div>No Jobs to display</div>
            ) : (
              this.renderJobs()
            )}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-7 stick">
            {this.state.selectedJob == "" ? (
              <div
                style={{ padding: "20px", fontSize: "16px", fontWeight: "600" }}
              >
                Select a job to view the details.
              </div>
            ) : (
              <div style={{ fontSize: "16px", fontWeight: "600" }}>
                {this.renderJobDescription()}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default JobsTab;
