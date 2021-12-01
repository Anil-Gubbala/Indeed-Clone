import React, { Component } from "react";
import "./messages.css";
import msg from "../../images/msg.jpeg";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      selectedChat: "",
      chats: [],
      typedmsg: "",
      error: "",
      messages: ["a"],
    };
  }

  componentDidMount() {
    get("/chat?id=" + "617741c6e129e6cc95ec54d2")
      .then((response) => {
        this.setState({ chats: response });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendMessage = (chat) => {
    console.log();
    if (this.state.typedmsg == "") this.setState({ error: "Enter Message" });
    else {
      let details = {
        chatId: chat._id,
        employerId: "617741c6e129e6cc95ec54d2",
        seekerId: "617eb6cba04aa292be25f725",
        message: {
          sentby: "617741c6e129e6cc95ec54d2",
          msg: this.state.typedmsg,
          time: "2016-05-18T16:00:00Z",
        },
      };
      let m = {
        sentby: "617741c6e129e6cc95ec54d2",
        msg: this.state.typedmsg,
        time: "2016-05-18T16:00:00Z",
      };
      post("/message", details)
        .then((response) => {
          let arr = [];
          for (let c of this.state.chats) {
            if (c._id == chat._id) {
              c.message.push(m);
            }
            arr.push(c);
          }
          console.log(arr);
          this.setState({ typedmsg: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  selectMessage = (chat) => {
    chat.message.sort((a, b) => a.time.localeCompare(b.time));
    this.setState({ selectedChat: chat });
  };

  render() {
    return (
      <>
        <div
          className="bck"
          style={{ bottom: "0px !important", top: "0px !important" }}
        >
          <div>
            <div
              style={{
                display: "flex",
                marginRight: "10%",
                marginLeft: "10%",
                padding: "20px",
              }}
            >
              <div
                className="col-md-3"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "0px",
                  border: "1px solid #e5e4e2",
                }}
              >
                <div style={{ padding: "15px" }}>
                  <div className="msgHeading">Messages</div>
                  <select
                    name="cars"
                    className="inbox"
                    id="cars"
                    disabled
                    style={{ marginTop: "10px" }}
                  >
                    <option value="inbox">Inbox</option>
                  </select>
                </div>
                <hr className="hrPadding"></hr>
                {/* MAP messages */}

                {this.state.chats == []
                  ? ""
                  : this.state.chats.map((chat) => {
                      return (
                        <>
                          {" "}
                          <div
                            aria-hidden="true"
                            className="icon chat"
                            style={{ padding: "15px", margin: "0px" }}
                            onClick={() => this.selectMessage(chat)}
                          >
                            <div
                              style={{
                                width: "100%",

                                marginTop: "15px",
                                marginBottom: "15px",
                              }}
                            >
                              <div style={{ display: "flex" }}>
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
                                <div
                                  style={{
                                    marginLeft: "15px",
                                    marginTop: "5px",
                                  }}
                                >
                                  Name
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="hrPadding"></hr>
                        </>
                      );
                    })}

                {/* MAP messages */}
                {/* 
                <div
                  aria-hidden="true"
                  class="icon chat"
                  style={{ display: "flex", padding: "15px", margin: "0px" }}
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
                  <div style={{ marginLeft: "15px" }}>
                    Company Name <br />
                    Name
                  </div>
                </div>

                <hr className="hrPadding"></hr> */}
              </div>
              <div
                className="col-md-7"
                style={{
                  backgroundColor: "white",
                  marginLeft: "30px",
                  borderRadius: "10px",
                  position: "relative",
                  padding: "25px",
                  border: "1px solid #e5e4e2",
                }}
              >
                {this.state.chats.length !== 0 ? (
                  this.state.selectedChat == "" ? (
                    <img
                      src={msg}
                      style={{
                        height: "320px",
                        width: "400px",
                        marginLeft: "200px",
                      }}
                      alt="Chat"
                    ></img>
                  ) : (
                    <>
                      <div style={{ bottom: "0px" }}>
                        {this.state.selectedChat == "" ? (
                          ""
                        ) : (
                          <div>
                            <div style={{ padding: "20px" }}>
                              <div className="scrlmessages">
                                {/* {console.log("***")}
                                {console.log(this.state.selectedChat)} */}
                                {this.state.selectedChat.message.map((msg) => {
                                  console.log(msg);
                                  let dt = new Date(msg.time)
                                    .toDateString()
                                    .substr(4, 15);
                                  let time = new Date(msg.time)
                                    .toTimeString()
                                    .substring(0, 8);
                                  return (
                                    <div style={{ marginBottom: "15px" }}>
                                      {msg.sentby ==
                                      "617741c6e129e6cc5ec54d2" ? (
                                        <>
                                          <div style={{ display: "flex" }}>
                                            <div
                                              aria-hidden="true"
                                              className="personl"
                                            >
                                              <div class="personl1">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  focusable="false"
                                                  role="img"
                                                  fill="currentColor"
                                                  viewBox="0 0 18 18"
                                                  aria-hidden="true"
                                                  class="personl2"
                                                >
                                                  <path d="M9 9a3 3 0 100-6 3 3 0 100 6zm0 1.5c-2.003 0-6 1.005-6 3v1a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1c0-1.995-3.998-3-6-3z"></path>
                                                </svg>
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                marginLeft: "10px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              You &nbsp;•&nbsp;
                                              <label
                                                style={{ color: "#A9A9A9" }}
                                              >
                                                {time + " " + dt}
                                              </label>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              marginLeft: "38px",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {msg.msg}
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div style={{ display: "flex" }}>
                                            <div
                                              aria-hidden="true"
                                              class="cmpl1"
                                            >
                                              <div
                                                data-cy="participant-avatar"
                                                class="cmpl2"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  focusable="false"
                                                  role="img"
                                                  fill="currentColor"
                                                  viewBox="0 0 18 18"
                                                  aria-hidden="true"
                                                  class="cmpl3"
                                                >
                                                  <path
                                                    fill-rule="evenodd"
                                                    d="M3.5 3a.5.5 0 00-.5.5v11a.5.5 0 00.5.5H5v-4h3v4h6.5a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5H11V3.5a.5.5 0 00-.5-.5h-7zM5 8.1a.25.25 0 01.25-.25h3.5A.25.25 0 019 8.1v.8a.25.25 0 01-.25.25h-3.5A.25.25 0 015 8.9v-.8zm4-3a.25.25 0 00-.25-.25h-3.5A.25.25 0 005 5.1v.8c0 .138.112.25.25.25h3.5A.25.25 0 009 5.9v-.8z"
                                                    clip-rule="evenodd"
                                                  ></path>
                                                </svg>
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                marginLeft: "10px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              Recruiter &nbsp;•&nbsp;
                                              <label
                                                style={{ color: "#A9A9A9" }}
                                              >
                                                {time + " " + dt}
                                              </label>
                                            </div>
                                            <br />
                                          </div>
                                          <div
                                            style={{
                                              marginLeft: "38px",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {msg.msg}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          bottom: "0%",
                          // position: "absolute",
                          width: "100%",
                          background: "white",
                        }}
                      >
                        {this.state.error == "" ? (
                          ""
                        ) : (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.error}
                          </div>
                        )}
                        <textarea
                          value={this.state.typedmsg}
                          style={{
                            width: "100%",
                            height: "100px",
                            borderColor: "#D3D3D3",
                          }}
                          onChange={(e) =>
                            this.setState({
                              error: "",
                              typedmsg: e.target.value,
                            })
                          }
                        ></textarea>
                        <div
                          style={{
                            textAlign: "right",
                            paddingRight: "10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <button
                            className="chatSendbtn"
                            onClick={() => {
                              this.sendMessage(this.state.selectedChat);
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Messages;
