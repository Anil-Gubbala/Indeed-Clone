import React, { Component } from 'react';
import './messages.css';
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="bck">
          <div style={{ display: 'flex', marginRight: '10%', marginLeft: '10%', padding: '20px' }}>
            <div className="col-md-3" style={{ backgroundColor: 'white', borderRadius: '4px' }}>
              <div className="icon1">
                <div className="icon">
                  <svg
                    focusable="false"
                    role="img"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    data-cy="conv-list-item-default-icon"
                    aria-hidden="true"
                    class="css-1ghtz21"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.5.5H5v-5h4v5h7.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5H12V3.5a.5.5 0 00-.5-.5h-8zM5 8h5v1H5V8zm5-3H5v1h5V5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <hr></hr>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>

            <div
              className="col-md-7"
              style={{ backgroundColor: 'white', marginLeft: '30px', borderRadius: '4px' }}
            >
              Messages
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Messages;
