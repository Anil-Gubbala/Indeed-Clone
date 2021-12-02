import React, { Component } from "react";
import "./snapshot.css";
import ceo from "../../images/ceo.jpeg";
import axios from "axios";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import wh from "../images/workhappiness.png";
import wh1 from "../images/wh1.png";
class Snapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: {},
      openModal: false,
      openHappyModal: false,
      reviews: [],
    };
  }

  componentDidMount() {
    get("/company?id=" + "61a5f182d511b8e0df9b5fdd")
      .then((response) => {
        console.log(response);
        this.setState({
          companyDetails: response,
        });
        get("/reviews?id=61a5f182d511b8e0df9b5fdd").then((resp) => {
          let arr = resp.filter((review) => review.featured == 1);
          this.setState({ reviews: arr });
          console.log(arr);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  happyModal = () => {
    return (
      <Modal open={this.state.openHappyModal} onClose={this.handleHappyClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: "700px",
            boxShadow: "24",
            borderRadius: "5px",
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
                <div style={{ alignSelf: "center", marginLeft: "15px" }}>
                  <div style={{ fontWeight: 500 }}>
                    Please help answer these questions about <b>Google</b>
                  </div>
                  <div style={{ fontSize: "12px", fontweight: "400" }}>
                    Your honest responses help other job seekers and it’s
                    anonymous.
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
                  onClick={this.handleHappyClose}
                >
                  <path
                    d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  reviewModal = () => {
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
            borderRadius: "5px",
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
              {/* <div
                className="col-md-10"
                style={{ fontSize: "18px", display: "flex" }}
              >
                <div style={{ alignSelf: "center", marginLeft: "15px" }}>
                  <div style={{ fontWeight: 500 }}>
                    Please help answer these questions about <b>Google</b>
                  </div>
                  <div style={{ fontSize: "12px", fontweight: "400" }}>
                    Your honest responses help other job seekers and it’s
                    anonymous.
                  </div>
                </div>
              </div> */}
              <div>
                <img
                  src={wh}
                  style={{ height: "200px", width: "600px" }}
                  alt="Happy image"
                ></img>
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
            <div
              style={{
                padding: "50px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <div className="subHeading">Why work happiness?</div>
              <div style={{ color: "#595959" }}>
                Developed with global academic partners, Indeed’s Work Happiness
                Report is your guide to finding a place where you belong.
              </div>

              <div
                className="space20"
                style={{ color: "#595959 ", display: "flex" }}
              >
                <div className="col-md-5">
                  <div
                    style={{
                      color: "black",
                      fontSize: "16px",
                      fontweight: "700",
                    }}
                  >
                    How the report works
                  </div>
                  <div>
                    Our research has identified 15 dimensions of work happiness.
                    Our survey asked people whether they agreed with a statement
                    about each dimension. Their responses were used to calculate
                    these scores.
                  </div>
                  <div
                    style={{
                      color: "black",
                      fontSize: "16px",
                      fontweight: "700",
                    }}
                    className="space20"
                  >
                    What you need to know
                  </div>
                  <div>
                    Users are asked to choose companies where they have worked,
                    but Indeed does not check their work history. Company
                    results do not reflect the opinion of Indeed.
                  </div>
                </div>
                <div className="col-md-4 leftm50">
                  <img
                    src={wh1}
                    style={{
                      height: "350px",
                      width: "250px",
                    }}
                    alt="Image"
                  ></img>
                </div>
              </div>
              <div className="bigtxt">How do you feel at work?</div>
              <div>
                <div style={{ textAlign: "left", marginTop: "15px" }}>
                  <button className="happybtn" onClick={this.handleHappyOpen}>
                    Review your employer
                  </button>
                </div>
              </div>
            </div>
            <div style={{ height: "40px" }}></div>
            {/* <hr></hr> */}
            {/* <div className="scrl"></div> */}
            {/* <hr></hr> */}
            {/* <div style={{ color: "red", marginLeft: "20px" }}>
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
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </button>
            </div> */}
          </div>
        </Box>
      </Modal>
    );
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleHappyOpen = () => {
    this.setState({
      openModal: false,
    });
    this.setState({ openHappyModal: true });
  };

  handleHappyClose = () =>
    this.setState({
      openHappyModal: false,
    });
  handleClose = () =>
    this.setState({
      openModal: false,
    });

  renderReviews = () => {
    return (
      <>
        <div>
          {this.state.reviews.map((review) => {
            return (
              <>
                <div>
                  <div style={{ display: "flex", marginBottom: "25px" }}>
                    <div className="col-md-2">
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          {review.rating}.0
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                          size="small"
                        />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                      >
                        {review.summary}
                      </div>
                      <label style={{ color: "#767676" }}>{review.date}</label>
                      <div style={{ marginTop: "10px" }}>{review.review}</div>
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          fontSize: "14px",
                          marginTop: "15px",
                        }}
                      >
                        <div>
                          {" "}
                          <svg
                            focusable="false"
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            aria-hidden="true"
                            class="iconyes"
                          >
                            <path d="M15.012 5.82a.5.5 0 000-.708L14.8 4.9a.5.5 0 00-.707 0l-7.069 7.07-2.971-2.973a.5.5 0 00-.707 0l-.212.212a.5.5 0 000 .707l3.538 3.538a.5.5 0 00.707 0l.566-.565-.001-.001 7.068-7.069z"></path>
                          </svg>
                        </div>
                        <div
                          className="prostxt"
                          style={{ fontweight: "600 !important" }}
                        >
                          Pros
                        </div>
                      </div>
                      <div style={{ marginLeft: "20px" }}>{review.pros}</div>
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          fontSize: "14px",
                          marginTop: "15px",
                        }}
                      >
                        <div>
                          <svg
                            focusable="false"
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            aria-hidden="true"
                            class="iconno"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16 8.948a7 7 0 11-14 0 7 7 0 0114 0zm-1.3 0a5.7 5.7 0 01-9.245 4.464l8.01-8.01A5.676 5.676 0 0114.7 8.949zM4.536 12.492l8.009-8.008a5.7 5.7 0 00-8.009 8.009z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="prostxt">Cons</div>
                      </div>
                      <div style={{ marginLeft: "20px" }}>{review.cons}</div>
                    </div>
                  </div>
                  {/* <div style={{ display: "flex" }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <div style={{ color: "#767676" }}>
                        Was this review helful
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "25px",

                          paddingTop: "10px",
                        }}
                      >
                        <div>
                          <button className="reviewhlp">Yes</button>
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <button className="reviewhlp">No</button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <hr></hr>
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
        {this.reviewModal()}
        {this.happyModal()}
        <div>
          <label className="componenttag">
            {this.state.companyDetails.name} Careers and Employment
          </label>
          <div>
            <div className="subHeading">Work happiness</div>
            <div style={{ textAlign: "right" }}>
              <button className="reviewButton" onClick={this.handleOpen}>
                Review work happiness
              </button>
            </div>
            <div>
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
                <img
                  src={this.state.companyDetails.ceoImage}
                  className="ceo1"
                  alt="CEO Image"
                />
              </div>
              <div
                className="col-md-10"
                style={{ marginTop: "0px", paddingTop: "0px !important" }}
              >
                <ul className="detailsBox row" style={{ marginTop: "-10px" }}>
                  <li className="box">
                    <div class="libox1">CEO</div>
                    <div class="libox2">{this.state.companyDetails.ceo}</div>
                  </li>
                  <li className="box">
                    <div className="libox1">Founded</div>
                    <div className="libox2">
                      {this.state.companyDetails.founded}
                    </div>
                  </li>
                  <li className="box">
                    <div className="libox1">company size</div>
                    <div className="libox2">
                      {this.state.companyDetails.companySize}
                    </div>
                  </li>
                  <li className="box">
                    <div className="libox1">Revenue</div>
                    <div className="libox2">
                      {this.state.companyDetails.revenue}
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className="box" style={{ marginLeft: "-5px" }}>
                    <div className="libox1">Industry</div>
                    <div className="libox2">
                      {this.state.companyDetails.industry}
                    </div>
                  </li>
                </ul>
                <div>{this.state.companyDetails.about}</div>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="subHeading">Jobs near you</div>
            <div>You're seeing Google jobs close to San Jose, CA.</div>
            <div className="nearJobs">
              <div className="nearJobs1">
                <div style={{ display: "flex" }}>
                  <div style={{ width: "500px" }}>sai</div>
                  <div style={{ width: "400px" }}>sai</div>
                  <div style={{ width: "400px" }}>sai</div>
                </div>
                
              </div>
            </div>
          </div> */}
          <div>
            <div className="subHeading" style={{ marginTop: "10px" }}>
              Company Description
            </div>
            <div>{this.state.companyDetails.description}</div>
          </div>

          <div>
            <div className="subHeading" style={{ marginTop: "10px" }}>
              Company Mission
            </div>
            <div>{this.state.companyDetails.mission}</div>
          </div>
          <div>
            <div className="subHeading" style={{ marginTop: "10px" }}>
              Reviews
            </div>
            <div>
              {this.state.reviews == []
                ? "No reviews to display..!"
                : this.renderReviews()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Snapshot;
