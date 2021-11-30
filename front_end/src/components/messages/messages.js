import React, { Component } from 'react';
import './messages.css';
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectedChat: '',
    };
  }
  render() {
    return (
      <>
        <div className="bck" style={{ height: '100% !important' }}>
          <div>
            <div
              style={{
                display: 'flex',
                marginRight: '10%',
                marginLeft: '10%',
                padding: '20px',
              }}
            >
              <div
                className="col-md-3"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  padding: '0px',
                  border: '1px solid #e5e4e2',
                }}
              >
                <div style={{ padding: '15px' }}>
                  <div className="msgHeading">Messages</div>
                  <select
                    name="cars"
                    className="inbox"
                    id="cars"
                    disabled
                    style={{ marginTop: '10px' }}
                  >
                    <option value="inbox">Inbox</option>
                  </select>
                </div>
                <hr className="hrPadding"></hr>
                {/* MAP messages */}
                <div
                  aria-hidden="true"
                  class="icon chat"
                  style={{ display: 'flex', padding: '15px', margin: '0px' }}
                >
                  <div class="icon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      focusable="false"
                      role="img"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      data-cy="conv-list-item-default-icon"
                      aria-hidden="true"
                      class="icon2"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.5.5H5v-5h4v5h7.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5H12V3.5a.5.5 0 00-.5-.5h-8zM5 8h5v1H5V8zm5-3H5v1h5V5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    Company Name <br />
                    Name
                  </div>
                </div>

                <hr className="hrPadding"></hr>
                {/* Till here */}
              </div>
              <div
                className="col-md-7"
                style={{
                  backgroundColor: 'white',
                  marginLeft: '30px',
                  borderRadius: '4px',
                  padding: '20px',
                  border: '1px solid #e5e4e2',
                }}
              >
                Messages
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Messages;
