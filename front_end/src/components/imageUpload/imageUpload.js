import React, { Component } from "react";
import S3 from "react-aws-s3";
import "./imageUpload.css";
import dotenv from "dotenv";
dotenv.config();

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "" /* optional */,
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

class UploadFile extends React.Component {
  state = { selectedFile: null };

  fileUploadHandler = (event) => {
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(event.target.files[0], "test")
      .then((data) => {
        console.log(data.location);
        if (data.status === 204) {
          console.log("success");
        } else {
          console.log("fail");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <label class="custom-file-upload">
          <input
            type="file"
            className="uploadbtn"
            onChange={this.fileUploadHandler}
          ></input>
        </label>
      </div>
    );
  }
}

export default UploadFile;
