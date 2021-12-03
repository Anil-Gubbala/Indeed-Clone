import React, { Children, Component } from "react";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

class AdminReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { allReviews: [], companyDetails: {} };
  }
  // this.props.location.state.c.id)

  componentDidMount() {
    this.setState({ companyDetails: this.props.location.state.id });
    // this.props.location.state.id._id)
    get("/admincompanyreviews?id=" + "61a47a7c41e79758f01d1ace")
      .then((response) => {
        console.log(response);
        this.setState({
          allReviews: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <div style={{ marginLeft: "20%", marginRight: "20%" }}>
          <div>
            <img
              src={this.state.companyDetails.companyPicture}
              alt="company Image"
              style={{ width: "1000px", height: "200px" }}
            ></img>
          </div>
          <div>{this.renderReviews()}</div>
        </div>
      </>
    );
  }
}

export default AdminReviews;
