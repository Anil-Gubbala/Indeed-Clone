import React, { useState, useEffect } from "react";
import "./Candidates.css";
import Navbar from "../EmpNavbar/EmpNavbar";
import Axios from "axios";
import { Link } from "react-router-dom";
import EmpNav from "../Employer/Empnav";
import image from "../images/find.jpg";
import { post } from "../../utils/serverCall";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Candidates() {
  const [applicants, setApplicants] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState("");
  const [can, setCan] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("viewing candidates");
    //Axios.defaults.headers.common.authorization = localStorage.getItem('token');

    post("/viewApplicants", { jobId: localStorage.getItem("jobId") }).then(
      (response) => {
        setApplicants(response.applicants);
        console.log(response.applicants);
      }
    );
  }, []);

  const sendmsg = () => {
    // let details = {
    //   employerId: "617741c6e129e6cc95ec54d2",
    //   seekerId: can._id,
    //   message: {
    //     sentby: "617741c6e129e6cc95ec54d2",
    //     msg: msg,
    //     time: "2016-05-18T16:00:00Z",
    //   },
    // };
    // post("/message", details)
    //   .then((response) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
    handleClose;
  };

  const chat = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>Send a Message</div>
            <input
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setmsg(e.target.value)}
            ></input>
            <br />
            <button
              className="sndbtn"
              style={{ margintop: "20px", textAlign: "right" }}
              onClick={sendmsg}
            >
              Send
            </button>
          </Box>
        </Modal>
      </div>
    );
  };

  const setStatus = (id) => {
    //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    post("/setApplicationStatus", { id: id, status: applicationStatus }).then(
      (response) => {
        console.log(response.data);
      }
    );
  };

  if (applicants.length == 0) {
    return (
      <>
        <Navbar />
        <EmpNav />
        <div className="header">{localStorage.getItem("jobTitle")}</div>
        <div className="noCandidates">
          <img src={image} alt="img" style={{ height: "20%", width: "20%" }} />
          <p style={{ fontWeight: "bold", color: "black" }}>
            There aren't any applicants in your list.
          </p>
          <Link
            to={"/EmployerLanding"}
            style={{ fontWeight: "bold", color: "rgb(9, 79, 136)" }}
          >
            View all Jobs
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <EmpNav />
        {chat()}
        <div className="header">
          {localStorage.getItem("jobTitle")} ({applicants.length})
        </div>
        {applicants.map(function (d, idx) {
          return (
            <div className="candidates">
              <div className="leftside">
                <Link
                  to={"emp/profile?id=" + d.userId}
                  // onClick={() => {
                  //   localStorage.setItem("userId", d._id);
                  // }}
                >
                  <h3 style={{ color: "steelblue" }}>{d.userName}</h3>
                  <h3 style={{ color: "steelblue" }}>User Profile</h3>
                </Link>
                {/* <p>
                  <a
                    href={d.resume}
                    download="Resume"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Resume
                  </a>
                </p> */}

                <p>Status: {d.status}</p>
                <p style={{ marginLeft: "20px" }}>
                  <ChatBubbleOutlineIcon
                    onClick={() => {
                      setCan(d);
                      handleOpen;
                    }}
                  />
                </p>
                <div className="rightside">
                  <select
                    type="text"
                    className="select"
                    onChange={(e) => {
                      setApplicationStatus(e.target.value);
                    }}
                  >
                    <option></option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Initial Screening">Initial Screening</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Hired">Hired</option>
                  </select>
                  <button
                    className="rightsideButton"
                    onClick={() => {
                      setStatus(d._id);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Candidates;
