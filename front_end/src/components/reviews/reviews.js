import React, { Component } from 'react';
import './reviews.css';
import { Select, Radio } from 'antd';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

class ReviewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      overAllRating: '',
      reviewSummary: '',
      yourReview: '',
      pros: '',
      cons: '',
      ceoApproval: '',
      prepare: '',
      error: '',
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => this.setState({ openModal: false, error: '' });

  handleSubmit = () => {
    console.log('reached');
    if (
      this.state.overAllRating == '' ||
      this.state.reviewSummary == '' ||
      this.state.yourReview == '' ||
      this.state.pros == '' ||
      this.state.cons == '' ||
      this.state.ceoApproval == '' ||
      this.state.prepare == ''
    ) {
      this.setState({ error: 'Enter all fields.' });
    } else {
      let details = {
        overAllRating: this.state.overAllRating,
        reviewSummary: this.state.reviewSummary,
        yourReview: this.state.yourReview,
        pros: this.state.pros,
        cons: this.state.cons,
        ceoApproval: this.state.ceoApproval,
        prepare: this.state.prepare,
      };
      console.log(details);
      this.setState({ openModal: false });
    }
  };

  reviewModal = () => {
    return (
      <Modal open={this.state.openModal} onClose={this.handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            width: '700px',
            boxShadow: '24',
            borderRadius: '10px',
          }}
        >
          <div>
            <div style={{ display: 'flex', padding: '5px', marginTop: '15px' }}>
              <div className="col-md-10" style={{ fontSize: '18px', display: 'flex' }}>
                <div>
                  <img src="" style={{ width: '100px', height: '100px' }} alt="" />
                </div>
                <div style={{ alignSelf: 'center', marginLeft: '15px' }}>
                  <div style={{ fontWeight: 500 }}>
                    Please help answer these questions about <b>Google</b>
                  </div>
                  <div style={{ fontSize: '12px', fontweight: '400' }}>
                    Your honest responses help other job seekers and it’s anonymous
                  </div>
                </div>
              </div>
              <div className="col-md-2" style={{ textAlign: '-webkit-center' }}>
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
              <div style={{ marginLeft: '20px' }}>
                <div className="shead">Overall rating</div>
                <div style={{ marginTop: '10px' }}>
                  <Radio.Group
                    className="selectGroup"
                    onChange={(e) => this.setState({ overAllRating: e.target.value })}
                  >
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2">2</Radio.Button>
                    <Radio.Button value="3">3</Radio.Button>
                    <Radio.Button value="4">4</Radio.Button>
                    <Radio.Button value="5">5</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">Review summary</div>
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    style={{ width: '300px', height: '70px' }}
                    onChange={(e) => this.setState({ reviewSummary: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">Your review</div>
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    style={{ width: '300px', height: '70px' }}
                    onChange={(e) => this.setState({ yourReview: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">Pros</div>
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    style={{ width: '300px', height: '70px' }}
                    onChange={(e) => this.setState({ pros: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">Cons</div>
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    style={{ width: '300px', height: '70px' }}
                    onChange={(e) => this.setState({ cons: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">CEO Approval</div>
                <div style={{ marginTop: '10px' }}>
                  <Radio.Group
                    className="selectGroup"
                    onChange={(e) => this.setState({ ceoApproval: e.target.value })}
                  >
                    <Radio.Button value="true">Yes</Radio.Button>
                    <Radio.Button value="false">No</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                <div className="shead">How should I prepare for an interview at this company?</div>
                <div style={{ marginTop: '10px' }}>
                  <textarea
                    style={{ width: '300px', height: '70px' }}
                    onChange={(e) => this.setState({ prepare: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>
            <hr></hr>
            <div style={{ color: 'red', marginLeft: '20px' }}>
              {this.state.error === '' ? '' : this.state.error}
            </div>
            <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
              <button
                className="submitbtn"
                onClick={this.handleSubmit}
                style={{ marginLeft: '5px' }}
              >
                Submit
              </button>
              <button
                className="cancelbtn"
                onClick={() => this.handleClose()}
                style={{ marginLeft: '5px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  renderReviews = () => {
    return (
      <>
        <div>render reviews here</div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.reviewModal()}
        <div style={{ display: 'inline-flex', width: '100%' }}>
          <div className="subHeading col-md-10">Google Employee Reviews</div>
          <div>
            <button className="reviewButton" onClick={this.handleOpen}>
              Review this company
            </button>
          </div>
        </div>
        <div className="reviews1">
          <div className="reviews2">
            <div style={{ display: 'flex' }}>
              <div className="col-md-5">
                <div className="shead">Job Title</div>
                <div>
                  <select className="dd">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="shead">Location</div>
                <div>
                  <select className="dd">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="reviews3">
              <div className="col-md-5">
                <div className="shead">Sort by</div>
                <Radio.Group className="selectGroup">
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
