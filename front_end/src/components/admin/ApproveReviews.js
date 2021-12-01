import React, { useEffect, useState } from "react";
import { get, put } from "../../utils/serverCall";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { showMessage } from "../../reducers/actions";

function ApproveReviews() {


 const dispatch = useDispatch();
 const [data, setData] = useState([]);

 const getUnfilteredReviews = ()=>{
    get("/getUnfilteredReviews", {})
    .then((result) => {
      setData(result)
    })
    .catch((error) => {
      console.log(error);
    });
 };

  useEffect(() => {
    getUnfilteredReviews();
  }, []);

  const flagReview = (_id,approved) =>{
    put("/flagReview",{_id,approved}).then(()=>{
        if(approved){
            dispatch(showMessage("Review marked as appropriate"))
        }else{
            dispatch(showMessage("Review marked as unappropriate"))
        }
        getUnfilteredReviews();
    }).catch((error)=>{
        console.log("fail", error)
    })
  };

  const handleYes = (e) =>{
    // console.log(e.target.getAttribute("id"))
    flagReview(e.target.getAttribute("id"),true)
  };
  const handleNo = (e) =>{
    // console.log(e.target.getAttribute("id"))
    flagReview(e.target.getAttribute("id"),false)
  };

  const renderReviews = 
      (<>
        <div style={{ margintop: "20px", padding: "25px" }}>
          <div>
            {data.length === 0 ? (
              "No Reviews to Display"
            ) : (
              <>
                {data.map((review) => {
                  return (
                    <div key = {review._id}>
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
                                // marginTop: "15px",
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
                                  className="iconyes"
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
                                // marginTop: "15px",
                              }}
                            >
                              <div>
                                <svg
                                  focusable="false"
                                  role="img"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                                  aria-hidden="true"
                                  className="iconno"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16 8.948a7 7 0 11-14 0 7 7 0 0114 0zm-1.3 0a5.7 5.7 0 01-9.245 4.464l8.01-8.01A5.676 5.676 0 0114.7 8.949zM4.536 12.492l8.009-8.008a5.7 5.7 0 00-8.009 8.009z"
                                    clipRule="evenodd"
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
                              Is this review appropriate ?
                            </div>
                            <div
                              style={{
                                display: "flex",
                                marginLeft: "25px",

                                paddingTop: "10px",
                              }}
                            >
                              <div>
                                <button className="reviewhlp" id={review._id} onClick={(e)=>{handleYes(e)}}>Yes</button>
                              </div>
                              <div style={{ marginLeft: "10px" }}>
                                <button className="reviewhlp" id={review._id} onClick={(e)=>{handleNo(e)}}>No</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr></hr>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </>);

  return <>{renderReviews}</>;
}

export default ApproveReviews;
