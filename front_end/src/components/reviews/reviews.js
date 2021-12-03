import React, { Component } from "react";
import "./reviews.css";
import { Select, Radio } from "antd";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";

class ReviewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      overAllRating: "0",
      reviewSummary: "",
      yourReview: "",
      pros: "",
      cons: "",
      ceoApproval: "",
      prepare: "",
      error: "",
      allReviews: [],
      selectedRating: "",
      selectedDate: "",
      selectedHelp: "",
      reviewsFromDB: [],
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () =>
    this.setState({
      openModal: false,
      overAllRating: "0",
      reviewSummary: "",
      yourReview: "",
      pros: "",
      cons: "",
      ceoApproval: "",
      prepare: "",
      error: "",
    });

  componentDidMount() {
    get("/reviews?id=" + "61a5f182d511b8e0df9b5fdd")
      .then((response) => {
        console.log(response);
        this.setState({ allReviews: response, reviewsFromDB: response });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // upvote = (id) => {
  //   put("/upvoterating?id=" + id)
  //     .then((response) => {
  //       console.log(response);
  //       // this.setState({ allReviews: response });
  //       let arr = [];
  //       for (let a of this.state.allReviews) {
  //         if (a._id == id) a.upVotes = a.upVotes + 1;
  //         arr.push(a);
  //       }
  //       this.setState({ allReviews: arr });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // downvote = (id) => {
  //   put("/downvoterating?id=" + id)
  //     .then((response) => {
  //       console.log(response);
  //       // this.setState({ allReviews: response });
  //       let arr = [];
  //       for (let a of this.state.allReviews) {
  //         if (a._id == id) {
  //           a.upVotes = a.downVotes - 1;
  //         }
  //         arr.push(a);
  //       }
  //       this.setState({ allReviews: arr });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  handleSubmit = () => {
    console.log("reached");
    if (
      this.state.overAllRating == "" ||
      this.state.reviewSummary == "" ||
      this.state.yourReview == "" ||
      this.state.pros == "" ||
      this.state.cons == "" ||
      this.state.ceoApproval == "" ||
      this.state.prepare == ""
    ) {
      this.setState({ error: "Enter all fields." });
    } else {
      let details = {
        companyId: "61a5f182d511b8e0df9b5fdd",
        userId: "61a5f182d511b8e0df9b5fda",
        date: new Date().toLocaleDateString(),
        upvotes: 0,
        downVotes: 0,
        rating: this.state.overAllRating,
        summary: this.state.reviewSummary,
        review: this.state.yourReview,
        pros: this.state.pros,
        cons: this.state.cons,
        approval: this.state.ceoApproval,
        prep: this.state.prepare,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: "1990-12-12 00:00:00",
        status: 0,
        featured: 0,
      };
      post("/reviews", details)
        .then((response) => {
          console.log(response);
          let arr = [...this.state.allReviews];
          arr.unshift(details);
          this.setState({ allReviews: arr });
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ openModal: false });
    }
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
                <div>
                  <img
                    src=""
                    style={{ width: "100px", height: "100px" }}
                    alt=""
                  />
                </div>
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
                <div className="shead">Overall rating</div>
                <div style={{ marginTop: "10px" }}>
                  {/* <Radio.Group
                    className="selectGroup"
                    onChange={(e) =>
                      this.setState({ overAllRating: e.target.value })
                    }
                  >
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2">2</Radio.Button>
                    <Radio.Button value="3">3</Radio.Button>
                    <Radio.Button value="4">4</Radio.Button>
                    <Radio.Button value="5">5</Radio.Button>
                  </Radio.Group> */}
                  <Rating
                    name="simple-controlled"
                    value={this.state.overAllRating}
                    onChange={(e) =>
                      this.setState({ overAllRating: e.target.value })
                    }
                  />
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Review summary</div>
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    style={{ width: "300px", height: "70px" }}
                    onChange={(e) =>
                      this.setState({ reviewSummary: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Your review</div>
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    style={{ width: "300px", height: "70px" }}
                    onChange={(e) =>
                      this.setState({ yourReview: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Pros</div>
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    style={{ width: "300px", height: "70px" }}
                    onChange={(e) => this.setState({ pros: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">Cons</div>
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    style={{ width: "300px", height: "70px" }}
                    onChange={(e) => this.setState({ cons: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">CEO Approval</div>
                <div style={{ marginTop: "10px" }}>
                  <Radio.Group
                    className="selectGroup"
                    onChange={(e) =>
                      this.setState({ ceoApproval: e.target.value })
                    }
                  >
                    <Radio.Button value="1">Yes</Radio.Button>
                    <Radio.Button value="0">No</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                <div className="shead">
                  How should I prepare for an interview at this company?
                </div>
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    style={{ width: "300px", height: "70px" }}
                    onChange={(e) => this.setState({ prepare: e.target.value })}
                  ></textarea>
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
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  sorting = (criteria) => {
    if (criteria == "Helpfulness") {
      let arr = [...this.state.allReviews];
      console.log("***");
      console.log(arr);
      arr.sort((a, b) => b.upVotes - a.upVotes);
      this.setState({ allReviews: arr });
    }
    if (criteria == "Rating") {
      let arr = [...this.state.allReviews];
      arr.sort((a, b) => b.rating - a.rating);
      this.setState({ allReviews: arr });
    }
    if (criteria == "Date") {
      let arr = [...this.state.allReviews];
      arr.sort((a, b) => b.date.localeCompare(a.date));
      this.setState({ allReviews: arr });
    }
  };

  filterReview = () => {
    if (this.state.selectedDate == "" && this.state.selectedRating == "") {
      this.setState({
        allReviews: this.state.reviewsFromDB,
      });
    } else {
      console.log("entered else");
      let arr = this.state.reviewsFromDB.filter((r) => {
        return (
          r.rating == this.state.selectedRating ||
          (this.state.selectedRating == "" &&
            (r.date > this.state.selectedDate || this.state.selectedDate == ""))
        );
      });
      this.setState({ allReviews: arr });
    }
  };

  renderReviews = () => {
    return (
      <>
        <div style={{ margintop: "20px", padding: "25px" }}>
          <div>
            {this.state.allReviews == [] ? (
              "No Reviews to Display"
            ) : (
              <>
                {this.state.allReviews.map((review) => {
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
                            <label style={{ color: "#767676" }}>
                              {review.date}
                            </label>
                            <div style={{ marginTop: "10px" }}>
                              {review.review}
                            </div>
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
                            <div style={{ marginLeft: "20px" }}>
                              {review.pros}
                            </div>
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
                            <div style={{ marginLeft: "20px" }}>
                              {review.cons}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
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
                                <button
                                  className="reviewhlp"
                                  // onClick={() => {
                                  //   this.upvote(review._id);
                                  // }}
                                >
                                  Yes - {review.upVotes}
                                </button>
                              </div>
                              <div style={{ marginLeft: "10px" }}>
                                <button
                                  className="reviewhlp"
                                  // onClick={() => {
                                  //   this.downvote(review._id);
                                  // }}
                                >
                                  No - {review.downVotes}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr></hr>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.reviewModal()}
        <div style={{ display: "inline-flex", width: "100%" }}>
          <div className="subHeading col-md-9">Google Employee Reviews</div>
          <div>
            <button className="reviewButton" onClick={this.handleOpen}>
              Review this company
            </button>
          </div>
        </div>
        <div className="reviews1">
          <div className="reviews2">
            <div style={{ display: "flex" }}>
              <div className="col-md-3">
                <div className="shead">Rating</div>
                <div>
                  <select
                    className="dd"
                    onChange={(e) => {
                      this.setState({ selectedRating: e.target.value });
                    }}
                  >
                    <option value="">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              {/* <div className="col-md-1"></div> */}
              <div className="col-md-3">
                <div className="shead">Ratings From</div>
                <div>
                  <input
                    type="date"
                    className="dtinp"
                    value={this.state.selectedDate}
                    onChange={(e) =>
                      this.setState({ selectedDate: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div className="col-md-3">
                <div className="shead">Helpfulness</div>
                <div>
                  <input
                    className="dtinp"
                    disabled
                    value={this.state.selectedHelp}
                    onChange={(e) =>
                      this.setState({ selectedHelp: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div
                className="col-md-3"
                style={{ marginLeft: "20px", paddingTop: "20px" }}
              >
                <button className="findsbtn" onClick={this.filterReview}>
                  Filter reviews
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="reviews3">
              <div className="col-md-5">
                <div className="shead">Sort by</div>
                <Radio.Group
                  className="selectGroup"
                  onChange={(e) => this.sorting(e.target.value)}
                >
                  <Radio.Button value="Helpfulness">Helpfulness</Radio.Button>
                  <Radio.Button value="Rating">Rating</Radio.Button>
                  <Radio.Button value="Date">Date</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <div>{this.renderReviews()}</div>
      </>
    );
  }
}

export default ReviewsTab;
