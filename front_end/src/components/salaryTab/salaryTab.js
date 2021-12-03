import React, { Component } from "react";
import { Select, Radio } from "antd";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./salaryTab.css";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
import { getUserId } from "../../utils/checkLogin";
class SalaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      error: "",
      companyName: "",
      isWorking: "",
      endDate: "",
      jobTitle: "",
      jobLocation: "",
      pay: "",
      experience: "",
      healthInsurance: "",
      lifeInsurance: "",
      dental: "",
      retirement: "",
      otherBenefits: "",
      category: "",
      allSalaries: {},
      salariesFromDB: {},
      salaryArrayDb: [],
      displayEndDate: "none",
      locations: [],
      jobTitles: [],
      selectedTitle: "",
      selectedLocation: "",
    };
  }

  componentDidMount() {
    get("/salary?id=" + this.props.id)
      .then((response) => {
        console.log(response);
        let arr = {};
        let loc = [];
        let jt = [];
        for (let s of response) {
          if (!arr[s.category]) arr[s.category] = [];
          arr[s.category].push(s);
          if (!loc.includes(s.jobLocation)) loc.push(s.jobLocation);
          if (!jt.includes(s.jobTitle)) jt.push(s.jobTitle);
        }

        this.setState({
          allSalaries: arr,
          salariesFromDB: arr,
          locations: loc,
          jobTitles: jt,
          salaryArrayDb: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  filterSalaries = () => {
    if (this.state.selectedLocation == "" && this.state.selectedTitle == "") {
      console.log("reached if");
      this.setState({
        allSalaries: this.state.salariesFromDB,
      });
    } else {
      console.log("reached else");
      let arra = [];
      arra = this.state.salaryArrayDb.filter((salary) => {
        return (
          (salary.jobTitle == this.state.selectedTitle ||
            this.state.selectedTitle == "") &&
          (salary.jobLocation == this.state.selectedLocation ||
            this.state.selectedLocation == "")
        );
      });
      let arr = [];
      console.log("printing arra");
      console.log(arra);
      for (let s of arra) {
        if (!arr[s.category]) arr[s.category] = [];
        arr[s.category].push(s);
      }
      console.log("printing arr");
      console.log(arr);
      this.setState({
        allSalaries: arr,
      });
    }
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleSubmit = () => {
    if (
      this.state.companyName == "" ||
      this.state.isWorking == "" ||
      this.state.jobTitle == "" ||
      this.state.jobLocation == "" ||
      this.state.pay == "" ||
      this.state.category == "" ||
      this.state.experience == ""
    ) {
      this.setState({ error: "Enter all fields." });
    } else {
      let details = {
        companyId: this.props.id,
        comapanyName: this.state.companyName,
        isWorking: this.state.isWorking,
        endDate: this.state.endDate,
        jobTitle: this.state.jobTitle,
        jobLocation: this.state.jobLocation,
        pay: this.state.pay,
        category: this.state.category,
        userId: getUserId,
        experience: this.state.experience,
        benefits: [
          this.state.healthInsurance,
          this.state.lifeInsurance,
          this.state.dental,
          this.state.retirement,
          this.state.otherBenefits,
        ],
      };
      post("/salary", details)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          let arr = this.state.allSalaries;
          let savedCategory = this.state.category;
          if (!arr[savedCategory]) {
            arr[savedCategory] = [];
            arr[savedCategory].push(details);
          }
        });
      this.setState({ openModal: false });
    }
  };

  handleClose = () => {
    this.setState({
      openModal: false,
      error: "",
      companyName: "",
      isWorking: "",
      endDate: "",
      jobTitle: "",
      jobLocation: "",
      pay: "",
      experience: "",
      category: "",
      healthInsurance: "",
      lifeInsurance: "",
      dental: "",
      retirement: "",
      otherBenefits: "",
    });
  };

  salaryModal = () => {
    return (
      <Modal open={this.state.openModal} onClose={this.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: "700px",
            boxShadow: "24",
            borderRadius: "10px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                padding: "5px",
                marginTop: "15px",
                marginLeft: "15px",
              }}
            >
              <div
                className="col-md-10"
                style={{ fontSize: "18px", display: "flex" }}
              >
                <div style={{ alignSelf: "left", marginLeft: "15px" }}>
                  <div style={{ fontWeight: 500, fontSize: "28px" }}>
                    Can you tell us about yourself?
                  </div>
                  <div style={{ fontSize: "12px", fontweight: "400" }}>
                    Let’s start building your report with basics, like your job
                    title, location and company.
                  </div>
                </div>
              </div>
              <div className="col-md-2" style={{ textAlign: "-webkit-center" }}>
                <svg
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  cursor="pointer"
                  onClick={this.handleClose}
                >
                  <path
                    d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <hr></hr>
            <div className="scrl">
              <div style={{ marginLeft: "20px" }}>
                <div className="shead">What’s your company name?</div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.companyName}
                    onChange={(e) =>
                      this.setState({ companyName: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">
                  Are you currently working at this company?
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Radio.Group
                    className="selectGroup"
                    value={this.state.isWorking}
                    onChange={(e) => {
                      this.setState({ isWorking: e.target.value });
                      if (e.target.value == 0)
                        this.setState({ displayEndDate: false });
                      if (e.target.value == 1)
                        this.setState({ displayEndDate: true });
                    }}
                  >
                    <Radio.Button value="1">Yes</Radio.Button>
                    <Radio.Button value="0">No</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              {this.state.displayEndDate ? (
                ""
              ) : (
                <>
                  <div
                    style={{
                      marginLeft: "20px",
                      marginTop: "20px",
                      display: this.state.displayEndDate,
                    }}
                  >
                    <div className="shead">End date</div>
                    <div style={{ marginTop: "10px" }}>
                      <select
                        className="salarydd"
                        value={this.state.endDate}
                        onChange={(e) =>
                          this.setState({ endDate: e.target.value })
                        }
                      >
                        <option value="">Select</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">What’s your job title?</div>

                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.jobTitle}
                    onChange={(e) =>
                      this.setState({ jobTitle: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">What’s your job category?</div>

                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.category}
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Where’s your job location?</div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.jobLocation}
                    onChange={(e) =>
                      this.setState({ jobLocation: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">What’s your pay?</div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.pay}
                    onChange={(e) => this.setState({ pay: e.target.value })}
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">
                  How many years of relevant experience do you have?
                </div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    className="salaryinp"
                    value={this.state.experience}
                    onChange={(e) =>
                      this.setState({ experience: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Which benefits do you receive?</div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Checkbox
                        value={this.state.healthInsurance}
                        onChange={(e) =>
                          this.setState({
                            healthInsurance:
                              this.state.healthInsurance == ""
                                ? "healthInsurance"
                                : "",
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      Health insurance
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Checkbox
                        value={this.state.lifeInsurance}
                        onChange={(e) =>
                          this.setState({
                            lifeInsurance:
                              this.state.lifeInsurance == ""
                                ? "lifeInsurance"
                                : "",
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      Life insurance
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Checkbox
                        value={this.state.dental}
                        onChange={(e) =>
                          this.setState({
                            dental: this.state.dental == "" ? "dental" : "",
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      Dental / Vision insurance
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Checkbox
                        value={this.state.retirement}
                        onChange={(e) =>
                          this.setState({
                            retirement:
                              this.state.retirement == "" ? "retirement" : "",
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      Retirement / 401(k)
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Checkbox
                        value={this.state.otherBenefits}
                        onChange={(e) =>
                          this.setState({
                            otherBenefits:
                              this.state.otherBenefits == ""
                                ? "otherBenefits"
                                : "",
                          })
                        }
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      Other benefits
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <div style={{ color: "red", marginLeft: "20px" }}>
              {this.state.error === "" ? "" : this.state.error}
            </div>
            <div style={{ textAlign: "center", paddingBottom: "15px" }}>
              <button
                className="submitbtn"
                onClick={this.handleSubmit}
                style={{ marginLeft: "5px" }}
              >
                Submit
              </button>
              <button
                className="cancelbtn"
                onClick={() => this.handleClose()}
                style={{ marginLeft: "25px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  renderSalaries = () => {
    let headers = Object.keys(this.state.allSalaries);
    return (
      <>
        <div style={{ padding: "15px" }}>
          {headers == []
            ? ""
            : headers.map((header) => {
                return (
                  <>
                    <div style={{ margintop: "10px" }}>{header}</div>
                    <div className="row">
                      {this.state.allSalaries[header].map((h) => {
                        return (
                          <>
                            <div
                              className=" salaryBox col-md-5"
                              style={{ display: "flex" }}
                            >
                              <div
                                className=" col-md-7"
                                style={{ fontweight: "500", fontSize: "14px" }}
                              >
                                {h.jobTitle}
                                <br />
                                <label style={{ color: "	#808080" }}>
                                  {h.jobLocation}
                                </label>
                              </div>

                              <div className=" col-md-5">
                                <div
                                  style={{
                                    fontweight: "500",
                                    fontSize: "14px",
                                    color: "#595959",
                                  }}
                                >
                                  Average Salary
                                </div>
                                <div>${h.pay}</div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    fontweight: "400",
                                    fontSize: "13px",
                                    color: "#595959",
                                  }}
                                >
                                  per year
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })}
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.salaryModal()}
        <div>
          <div className="reviews1">
            <div
              className="reviews2"
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div className="col-md-4">
                  <div className="shead">Job Title</div>
                  <div>
                    <select
                      className="dd"
                      onChange={(e) => {
                        this.setState({ selectedTitle: e.target.value });
                      }}
                    >
                      <option value="">All</option>
                      {this.state.jobTitles.map((j) => {
                        return (
                          <>
                            <option value={j}>{j}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                  <div className="shead">Location</div>
                  <div>
                    <select
                      className="dd"
                      onChange={(e) => {
                        this.setState({ selectedLocation: e.target.value });
                      }}
                    >
                      <option value="">All</option>
                      {this.state.locations.map((l) => {
                        return (
                          <>
                            <option value={l}>{l}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div
                  className="col-md-2"
                  style={{ marginLeft: "20px", paddingTop: "20px" }}
                >
                  <button className="findsbtn" onClick={this.filterSalaries}>
                    Find Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <div style={{ textAlign: "right" }}>
              <button className="salaryButton" onClick={this.handleOpen}>
                Add a salary
              </button>
            </div>
            <div style={{ fontSize: "22px", fontWeight: "600" }}>
              <div>
                {this.state.allSalaries == {} ? (
                  <div
                    style={{
                      padding: "15px",
                      fontweight: "600",
                      fontSize: "16px",
                    }}
                  >
                    "No Salaries to Display"
                  </div>
                ) : (
                  this.renderSalaries()
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SalaryTab;
