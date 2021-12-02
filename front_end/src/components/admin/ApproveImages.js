import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { get, put } from "../../utils/serverCall";
import { useDispatch } from "react-redux";
import { showMessage } from "../../reducers/actions";
import { Typography } from "@mui/material";

function ApproveImages() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [showImage, setShowImage] = useState(false);
  const dispatch = useDispatch();
  const getUnfilteredImages = () => {
    get("/getUnfilteredImages", {})
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setSelectedImage({});
    setShowImage(false);
  };

  useEffect(() => {
    getUnfilteredImages();
  }, []);

  const flagImage = (_id,approved) =>{
    put("/flagImage",{_id,approved}).then(()=>{
        if(approved){
            dispatch(showMessage("Image marked as appropriate"))
        }else{
            dispatch(showMessage("Image marked as unappropriate"))
        }
        getUnfilteredImages();
    }).catch((error)=>{
        console.log("fail", error)
    })
  };

  const handleYes = (e) =>{
    // console.log(e.target.getAttribute("id"))
    flagImage(selectedImage._id,true);
    handleClose();
  };
  const handleNo = (e) =>{
    // console.log(e.target.getAttribute("id"))
    flagImage(selectedImage._id,false);
    handleClose();
  };

  // const imageModal = (
  //   <Modal open={showImage} onClose={handleClose}>
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%, -50%)",
  //         bgcolor: "white",
  //         width: "600px",
  //         boxShadow: "24",
  //         borderRadius: "10px",
  //       }}
  //     >
  //       <div>
  //         <div style={{ display: "flex", padding: "5px", marginTop: "15px" }}>
  //           <div
  //             className="col-md-10"
  //             style={{ fontSize: "18px", fontWeight: "600" }}
  //           >
  //             Photo
  //           </div>
  //           <div className="col-md-2" style={{ textAlign: "-webkit-center" }}>
  //             <svg
  //               width="24px"
  //               height="24px"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               aria-hidden="true"
  //               focusable="false"
  //               cursor="pointer"
  //               onClick={handleClose}
  //             >
  //               <path
  //                 d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
  //                 fill="#000000"
  //               ></path>
  //             </svg>
  //           </div>
  //         </div>
  //         <hr></hr>
  //         <div>
  //           <img
  //             src={selectedImage.imageUrl}
  //             style={{
  //               width: "600px",
  //               height: "450px",
  //               marginRight: "15px",
  //               marginTop: "0px",
  //               marginBottom: "15px",
  //               cursor: "pointer",
  //             }}
  //             alt="Company image"
  //           ></img>
  //           <div>{selectedImage.caption}</div>
  //         </div>
  //       </div>
  //     </Box>
  //   </Modal>
  // );

  const dlg = (
    <Dialog open={showImage} onClose={handleClose}>
      <DialogTitle>Approve Image</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        {/* <Box
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
        > */}
          <div>
            <div>
              <img
                src={selectedImage.imageUrl}
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
              <div>{selectedImage.caption}</div>
            </div>
          </div>
        {/* </Box> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes}>Approve</Button>
        <Button onClick={handleNo}>Reject</Button>
      </DialogActions>
    </Dialog>
  );

  const handleImageOpen = () => {
    console.log("showing Image");
    setShowImage(true);
  };

  return (
    <div>
      {/* <div>{imageModal}</div> */}
      <div>{dlg}</div>
      {data.length <= 0 ? (
        <Typography variant="h6" gutterBottom component="div">
        No Images to approve
      </Typography>
      ) : (
        <div style={{ display: "contents" }}>
          {data.map((image) => {
            return (
              <div key={image._id}>
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
                    console.log("click");
                    setSelectedImage(image);
                    handleImageOpen();
                  }}
                  alt="companyImage"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ApproveImages;
