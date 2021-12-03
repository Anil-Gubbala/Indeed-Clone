import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import S3 from "react-aws-s3";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./photosTab.css";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "company",
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

class PhotosTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileError: "",
      openModel: false,
      ImageModel: false,
      imageUrl: "",
      caption: "",
      location: "",
      allImages: [],
      selectedImage: "",
    };
  }

  componentDidMount() {
    get("/photos?id=" + this.props.id + "&attributeName=companyId")
      .then((response) => {
        console.log(response);
        this.setState({ allImages: response });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleOpen = () => {
    this.setState({ openModel: true });
  };

  handleImageOpen = () => {
    this.setState({ ImageModel: true });
  };

  handleClose = () =>
    this.setState({ openModel: false, ImageModel: false, file: null });

  fileSelected = (e) => {
    if (e.target == null) {
      this.setState({ fileError: "Select a file." });
    } else {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        this.setState({ file: e.target.files[0] });
      } else {
        this.setState({ fileError: "Only jpeg and png are allowed" });
      }
    }
  };

  submit = () => {
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(this.state.file, uuidv4())
      .then((data) => {
        this.setState({ imageUrl: data.location });
        if (data.status === 204) {
          console.log(" Customer image to S3 success");
          let details = {
            companyId: this.props.id,
            imageUrl: data.location,
            isVerified: false,
            caption: this.state.caption,
            location: this.state.location,
          };

          post("/photos", details)
            .then((response) => {
              console.log(response.data);
              this.setState({ openModel: false });
              let arr = this.state.allImages;
              arr.push(details);
              this.setState({ allImages: arr });
              console.log("success");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(" company image to S3 fail");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadModal = () => {
    return (
      <Modal open={this.state.openModel} onClose={this.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: "450px",
            boxShadow: "24",
            borderRadius: "10px",
          }}
        >
          <div>
            <div style={{ display: "flex", padding: "5px", marginTop: "15px" }}>
              <div
                className="col-md-10"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                Upload a photo
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
            <div
              style={{
                padding: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <div>Select a photo of your workplace or company event.</div>
              <div
                style={{ display: "flex", fontSize: "14px", marginTop: "15px" }}
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
                <div>Workplace or company events</div>
              </div>
              <div
                style={{ display: "flex", fontSize: "14px", marginTop: "15px" }}
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
                <div>No selfies</div>
              </div>
              <div
                style={{
                  color: "#595959",
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                By uploading this photograph, you represent that you are the
                owner of this photograph and verify that you have the right and
                required permissions to post it to Indeed.
              </div>
            </div>
            {this.state.file == null ? (
              ""
            ) : (
              <>
                <div style={{ marginLeft: "20px" }}>
                  <div>Photo location</div>
                  <input
                    className="inpmodal"
                    onChange={(e) =>
                      this.setState({ location: e.target.value })
                    }
                  ></input>
                  <div style={{ marginTop: "10px" }}>Caption</div>
                  <input
                    className="inpmodal"
                    onChange={(e) => this.setState({ caption: e.target.value })}
                  ></input>
                </div>
              </>
            )}
            <hr></hr>
            <div
              style={{
                display: "flex",
                padding: "0px",
                marginBottom: "20px",
                textAlign: "right",
              }}
            >
              <div className="col-md-4"></div>
              {this.state.file == null ? (
                <input
                  type="file"
                  onChange={(e) => this.fileSelected(e)}
                ></input>
              ) : (
                <button
                  className="reviewButtons"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginLeft: "30px",
                  }}
                  onClick={this.submit}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  imageModal = () => {
    return (
      <Modal open={this.state.ImageModel} onClose={this.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: "600px",
            boxShadow: "24",
            borderRadius: "10px",
          }}
        >
          <div>
            <div style={{ display: "flex", padding: "5px", marginTop: "15px" }}>
              <div
                className="col-md-10"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                Photo
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
            <div>
              <img
                src={this.state.selectedImage.imageUrl}
                style={{
                  width: "600px",
                  height: "450px",
                  marginRight: "15px",
                  marginTop: "0px",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
                alt="Company image"
              ></img>
              <div>{this.state.selectedImage.caption}</div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  renderPhotos = () => {
    return (
      <>
        {this.state.allImages == undefined ? (
          ""
        ) : (
          <div style={{ display: "contents" }}>
            {this.state.allImages.map((image) => {
              return (
                <>
                  <img
                    src={image.imageUrl}
                    style={{
                      width: "161px",
                      height: "161px",
                      borderRadius: "15px",
                      marginRight: "15px",
                      marginBottom: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setState({ selectedImage: image });
                      this.handleImageOpen();
                    }}
                    alt="companyImage"
                  />
                </>
              );
            })}
          </div>
        )}
      </>
    );
  };

  render() {
    return (
      <>
        {this.uploadModal()}
        {this.imageModal()}
        <div>
          <div className="subHeading">Company Photos</div>
          <div style={{ textAlign: "center" }}>
            <button className="reviewButtons" onClick={this.handleOpen}>
              Upload a photo
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>{this.renderPhotos()}</div>
        </div>
      </>
    );
  }
}

export default PhotosTab;
