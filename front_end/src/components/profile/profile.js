import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./profile.css";
import S3 from "react-aws-s3";
import { saveAs } from "file-saver";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Card, Modal } from "react-bootstrap";
import { MdUpload, MdModeEdit, MdDetails } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { IoIosLock } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import DashLoginNav from "../navbar/DashLoginNav";
import { get, post } from "../../utils/serverCall";
import { isSignedIn, accountType } from "../../utils/checkLogin";

function Profile() {
  const Input = styled("input")({
    display: "none",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: "company",
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };

  const defaultValues = {
    firstname: "",
    lastname: "",
    emailId: "",
    contact: "",
    resumeLink: "",
  };
  const [details, setDetails] = useState(defaultValues);
  const [open, setOpen] = useState("");
  const [file, setfile] = useState("");
  const [submit, setsubmit] = useState("");
  const [url, setfileurl] = useState("");
  const [replace, setreplace] = useState("");
  const handleChange = () => {
    setfileurl("");
    console.log("Entered");
  };

  useEffect(() => {
    get(`/userprofile`, { id: localStorage.getItem("userId") }).then(
      (response) => {
        setDetails(response);
        console.log(response);
        setfileurl(response.resumeLink);
      }
    );
  }, []);

  const fileSelected = (e) => {
    setfile(e.target.files[0]);
    setsubmit(true);
  };

  const downloadfile = () => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveProfile = () => {
    event.preventDefault();
    post(`/updateuserprofile`, { details }).then((response) => {
      console.log(response);
    });
  };

  const deleteResume = (event) => {
    const details = {
      id: localStorage.getItem("userId"),
      resumeLink: "",
    };
    post("/updateresume", details)
      .then((response) => {
        setfile("");
        setfileurl("");

        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Submit = (event) => {
    console.log("Entered");
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file)
      .then((data) => {
        setfileurl(data.location);
        if (data.status === 204) {
          console.log(" Resume upload to S3 success", data.location);
          const details = {
            id: localStorage.getItem("userId"),
            resumeLink: data.location,
          };
          console.log(details);
          post("/updateresume", details)
            .then((response) => {
              console.log(response);
              // window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
          setsubmit(false);
        } else {
          console.log(" customer image to S3 fail");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadMyFile = () => {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", url);
    link.setAttribute("download", `{details.firstname}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isSignedIn()) {
    return <Redirect push to="/login" />;
  }

  const employerview = () => {
    return (
      <container>
        <DashLoginNav />
        <container className="profile__main__container">
          <div className="profile-main">
            <div className="circle">
              <div style={{ margin: 15 }}>
                <h2>
                  {details.firstname[0]}
                  {details.lastname[0]}
                </h2>
              </div>
            </div>
            <div style={{ margin: 15 }}>
              <h2>
                {details.firstname} {details.lastname}
              </h2>
            </div>
          </div>
        </container>
        <container className="profile__body__container">
          <Card
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "flex-start",
              marginBottom: 10,
              width: 600,
              height: "auto",
              flexFlow: "wrap",
              borderRadius: 20,
            }}
          >
            <Card.Body>
              {details.resumeLink != "" ? (
                <div className="icl-body">
                  <div className="icl">Resume</div>
                  <div className="meta-flex">
                    <svg
                      width="44"
                      height="64"
                      viewBox="0 0 44 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M26 1.09384C26 0.489727 26.4897 0 27.0938 0C27.674 0 28.2305 0.230486 28.6408 0.640755L43.3592 15.3592C43.7695 15.7695 44 16.326 44 16.9062C44 17.5103 43.5103 18 42.9062 18H28C26.8954 18 26 17.1046 26 16L26 1.09384Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M0 2C0 0.895431 0.895431 0 2 0H27C28.1046 0 29 0.895431 29 2V13C29 14.1046 29.8954 15 31 15H42C43.1046 15 44 15.8954 44 17V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V2Z"
                        fill="#E4E2E0"
                      />
                      <path
                        d="M6 7C6 6.44772 6.44772 6 7 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H7C6.44772 8 6 7.55228 6 7Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 11C6 10.4477 6.44772 10 7 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H7C6.44772 12 6 11.5523 6 11Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 15C6 14.4477 6.44772 14 7 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H7C6.44772 16 6 15.5523 6 15Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 21C6 20.4477 6.44772 20 7 20H37C37.5523 20 38 20.4477 38 21C38 21.5523 37.5523 22 37 22H7C6.44772 22 6 21.5523 6 21Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 25C6 24.4477 6.44772 24 7 24H37C37.5523 24 38 24.4477 38 25C38 25.5523 37.5523 26 37 26H7C6.44772 26 6 25.5523 6 25Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 29C6 28.4477 6.44772 28 7 28H37C37.5523 28 38 28.4477 38 29C38 29.5523 37.5523 30 37 30H7C6.44772 30 6 29.5523 6 29Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M6 33C6 32.4477 6.44772 32 7 32H37C37.5523 32 38 32.4477 38 33C38 33.5523 37.5523 34 37 34H7C6.44772 34 6 33.5523 6 33Z"
                        fill="#D4D2D0"
                      />
                      <path
                        d="M0 44H44V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V44Z"
                        fill="#085ff7"
                      />
                      <text
                        fontSize="12"
                        fontWeight="700"
                        fill="#FFFFFF"
                        aria-hidden="true"
                      >
                        <tspan x="10" y="58">
                          PDF
                        </tspan>
                      </text>
                    </svg>
                    <div className="pdf" style={{ paddingLeft: "30px" }}>
                      <div className="name">
                        {details.firstname} {details.lastname}.pdf
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button>
                          <a
                            style={{ display: "table-cell" }}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </Button>
                        <Button>
                          <Link
                            to={{
                              pathname: `{url}`,
                            }}
                            target="_blank"
                            download
                          >
                            Download
                          </Link>
                        </Button>
                      </div>
                      <div>
                        <div className="time"> Added today </div>
                        <div className="public">
                          <AiFillEye /> Public
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>No resume uploaded</div>
              )}
            </Card.Body>
          </Card>
          <Card
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              margin: 10,
              width: 600,
              height: "auto",
              flexFlow: "wrap",
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: 10,
                  flexDirection: "column",
                }}
              >
                <container>
                  <div className="profile_contact">
                    <h3>Contact Information</h3>
                  </div>
                  <div>
                    <div>
                      {details.firstname} {details.lastname}
                    </div>
                    <div>
                      {details.emailId}
                      <IoIosLock />
                    </div>
                    <div>
                      {details.contact}
                      <IoIosLock />
                    </div>
                  </div>
                </container>
              </div>
            </Card.Body>
          </Card>
          <Card
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              margin: 10,
              width: 600,
              height: "auto",
              flexFlow: "wrap",
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: 10,
                  flexDirection: "column",
                }}
              >
                <div className="profile_contact">
                  <h3>Job preferences</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </container>
      </container>
    );
  };

  return (
    <container>
      <DashLoginNav />
      {localStorage.getItem("accountType") === "jobseeker" ? (
        <div>
          <container className="profile__main__container">
            <div className="profile-main">
              <div className="circle">
                <div style={{ margin: 15 }}>
                  <h2>
                    {details.firstname[0]}
                    {details.lastname[0]}
                  </h2>
                </div>
              </div>
              <div style={{ margin: 15 }}>
                <h2>
                  {details.firstname} {details.lastname}
                </h2>
              </div>
            </div>
          </container>
          <container className="profile__body__container">
            <Card
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-start",
                marginBottom: 10,
                width: 600,
                height: "auto",
                flexFlow: "wrap",
                borderRadius: 20,
              }}
            >
              <Card.Body>
                {/* {(file && !submit) || details.resumeLink != null ? ( */}
                {url != "" || (file && !submit && !replace) ? (
                  <div className="icl-body">
                    <div className="icl">Resume</div>
                    <div className="meta-flex">
                      <svg
                        width="44"
                        height="64"
                        viewBox="0 0 44 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M26 1.09384C26 0.489727 26.4897 0 27.0938 0C27.674 0 28.2305 0.230486 28.6408 0.640755L43.3592 15.3592C43.7695 15.7695 44 16.326 44 16.9062C44 17.5103 43.5103 18 42.9062 18H28C26.8954 18 26 17.1046 26 16L26 1.09384Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M0 2C0 0.895431 0.895431 0 2 0H27C28.1046 0 29 0.895431 29 2V13C29 14.1046 29.8954 15 31 15H42C43.1046 15 44 15.8954 44 17V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V2Z"
                          fill="#E4E2E0"
                        />
                        <path
                          d="M6 7C6 6.44772 6.44772 6 7 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H7C6.44772 8 6 7.55228 6 7Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 11C6 10.4477 6.44772 10 7 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H7C6.44772 12 6 11.5523 6 11Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 15C6 14.4477 6.44772 14 7 14H21C21.5523 14 22 14.4477 22 15C22 15.5523 21.5523 16 21 16H7C6.44772 16 6 15.5523 6 15Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 21C6 20.4477 6.44772 20 7 20H37C37.5523 20 38 20.4477 38 21C38 21.5523 37.5523 22 37 22H7C6.44772 22 6 21.5523 6 21Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 25C6 24.4477 6.44772 24 7 24H37C37.5523 24 38 24.4477 38 25C38 25.5523 37.5523 26 37 26H7C6.44772 26 6 25.5523 6 25Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 29C6 28.4477 6.44772 28 7 28H37C37.5523 28 38 28.4477 38 29C38 29.5523 37.5523 30 37 30H7C6.44772 30 6 29.5523 6 29Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M6 33C6 32.4477 6.44772 32 7 32H37C37.5523 32 38 32.4477 38 33C38 33.5523 37.5523 34 37 34H7C6.44772 34 6 33.5523 6 33Z"
                          fill="#D4D2D0"
                        />
                        <path
                          d="M0 44H44V62C44 63.1046 43.1046 64 42 64H2C0.895431 64 0 63.1046 0 62V44Z"
                          fill="#085ff7"
                        />
                        <text
                          fontSize="12"
                          fontWeight="700"
                          fill="#FFFFFF"
                          aria-hidden="true"
                        >
                          <tspan x="10" y="58">
                            PDF
                          </tspan>
                        </text>
                      </svg>
                      <div className="pdf" style={{ paddingLeft: "30px" }}>
                        <div className="name">
                          {details.firstname} {details.lastname}.pdf
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button>
                            <a
                              style={{ display: "table-cell" }}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View
                            </a>
                          </Button>
                          {/* <Button>
                      <Link
                        to={{
                          pathname:
                            {details.resumeLink},
                        }}
                        target="_blank"
                        download
                      >
                        Download
                      </Link>
                      </Button> */}
                          <Button onClick={downloadMyFile}>Download</Button>
                          <Button onClick={downloadfile}>Download</Button>

                          <label htmlFor="contained-button-file">
                            <Input
                              accept="application/pdf"
                              id="contained-button-file"
                              multiple
                              type="file"
                              display="none"
                              onChange={(e) => {
                                console.log("Entered");
                                setreplace("true");
                                fileSelected(e);
                              }}
                            />
                            <Button component="span">Replace</Button>
                          </label>
                          <Button onClick={deleteResume}>Delete</Button>
                        </div>
                        {submit ? (
                          <Button
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                            onClick={Submit}
                          >
                            Save
                          </Button>
                        ) : (
                          ""
                        )}
                        <div className="time"> Added today </div>
                        <div className="public">
                          <AiFillEye /> Public
                        </div>
                      </div>
                      <div className="dots">
                        <BsThreeDotsVertical onClick={handleShow} />
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Body>
                            <Button>View File</Button>
                          </Modal.Body>
                          <Modal.Body>
                            <Button>Replace file</Button>
                          </Modal.Body>
                          <Modal.Body>
                            <Button>Delete file</Button>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                      height: "auto",
                    }}
                  >
                    <h3>Get started</h3>

                    <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="application/pdf"
                          id="contained-button-file"
                          multiple
                          type="file"
                          display="none"
                          onChange={(e) => {
                            console.log("Entered");
                            fileSelected(e);
                          }}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          style={{
                            borderRadius: "25px",
                            backgroundColor: "white",
                            color: "#1150bf",
                            border: "2px solid #1150bf",
                          }}
                        >
                          <MdUpload
                            style={{ fontSize: "1.5rem", color: "#1150bf" }}
                          />
                          Upload a Resume
                        </Button>
                      </label>
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="application/pdf"
                          id="contained-button-file"
                          multiple
                          type="file"
                          display="none"
                        />
                        <Button
                          variant="contained"
                          component="span"
                          style={{
                            borderRadius: "25px",
                            backgroundColor: "white",
                            color: "#1150bf",
                            border: "2px solid #1150bf",
                          }}
                        >
                          Build a Resume
                        </Button>
                      </label>
                    </Stack>
                    {submit ? (
                      <Button
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        onClick={Submit}
                      >
                        Save
                      </Button>
                    ) : (
                      ""
                    )}

                    {/* </container> */}
                    <div style={{ marginTop: "10px" }}>
                      By continuing, you agree to create a{" "}
                      <a href="https://hrtechprivacy.com/brands/indeed#s4-4">
                        public resume
                      </a>{" "}
                      and agree to receiving job opportunities from employers.
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                margin: 10,
                width: 600,
                height: "auto",
                flexFlow: "wrap",
                borderRadius: 20,
              }}
            >
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: 10,
                    flexDirection: "column",
                  }}
                >
                  <container>
                    <div className="profile_contact">
                      <h3>Contact Information</h3>
                      <MdModeEdit
                        style={{
                          justifyContent: "flex-end",
                          cursor: "pointer",
                        }}
                        onClick={() => setOpen(true)}
                      />
                    </div>
                    {open ? (
                      <div>
                        <div>
                          <h5>Add phone number</h5>
                        </div>
                        <span className="required">*</span>Required fields
                        <div>
                          <label htmlFor="fname" style={{ fontWeight: "700" }}>
                            First Name <span className="required">*</span>
                          </label>
                          <br />
                          <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={details.firstname}
                            onChange={(e) => {
                              setDetails({
                                ...details,
                                firstname: e.target.value,
                              });
                            }}
                          />
                          <br />
                          <label htmlFor="lname" style={{ fontWeight: "700" }}>
                            Last Name <span className="required">*</span>
                          </label>
                          <br />
                          <input
                            type="text"
                            id="lname"
                            name="lname"
                            value={details.lastname}
                            onChange={(e) => {
                              setDetails({
                                ...details,
                                lastname: e.target.value,
                              });
                            }}
                          />
                          <br />
                          <br />
                          <div>
                            Email Address <IoIosLock /> only provided to
                            employers you apply or respond to.
                          </div>
                          <div>{details.emailId}</div>
                          <br />
                          <div>
                            Phone Number(optional) <IoIosLock /> only provided
                            to employers you apply or respond to.
                          </div>
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={details.contact}
                            onChange={(e) => {
                              setDetails({
                                ...details,
                                contact: e.target.value,
                              });
                            }}
                          />
                          <br />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button
                              variant="contained"
                              component="span"
                              style={{
                                borderRadius: "25px",
                                backgroundColor: "#1150bf",
                                color: "#ffff",
                                border: "2px solid #1150bf",
                                height: "45px",
                              }}
                              onClick={() => {
                                setOpen(false);
                                saveProfile();
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              style={{ margin: "10px" }}
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          {details.firstname} {details.lastname}
                        </div>
                        <div>
                          {details.emailId}
                          <IoIosLock />
                        </div>
                        <div>
                          {details.contact}
                          <IoIosLock />
                        </div>
                      </div>
                    )}
                  </container>
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                margin: 10,
                width: 600,
                height: "auto",
                flexFlow: "wrap",
                borderRadius: 20,
              }}
            >
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: 10,
                    flexDirection: "column",
                  }}
                >
                  <div className="profile_contact">
                    <h3>Job preferences</h3>
                    <MdModeEdit style={{ justifyContent: "flex-end" }} />
                  </div>
                  <div>
                    Save specific details like desired pay and schedule that
                    help us match you with better jobs
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Grid
              container
              spacing={1}
              style={{
                fontSize: "14px",
                backgroundColor: "white",
                padding: "15px 10px",
                margin: "0 -20px ",
              }}
            >
              <Grid item style={{ cursor: "pointer" }}>
                © 2021 Indeed
              </Grid>
              <Grid item>-</Grid>
              <Grid item style={{ cursor: "pointer" }}>
                Cookies, Privacy and Terms
              </Grid>
              <Grid item>-</Grid>
              <Grid item style={{ cursor: "pointer" }}>
                Do Not Sell My Personal Information
              </Grid>
            </Grid>
          </container>
        </div>
      ) : (
        <div>{employerview()}</div>
      )}
    </container>
  );
}

export default Profile;
