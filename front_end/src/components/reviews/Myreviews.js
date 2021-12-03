import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import Rating from "@mui/material/Rating";



function MyReviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`/userReviews`, { params: { id: '61a5f182d511b8e0df9b5fda' } }).then((response) => {
          console.log(response.data);
          setReviews(response.data);
        });
      }, []);

    const renderReviews = () => {
        return (
          <>
            <div style={{ margintop: "20px", padding: "25px" }}>
              <div>
                {reviews == [] ? (
                  "No Reviews to Display"
                ) : (
                  <>
                    {reviews.map((review) => {
                      return (
                        <>
                          <div>
                          <a href="/companyHome">
                            <h2 class="cow-CompanyReviews-cmp-name css-1q0r4vf e1tiznh50" style={{color: '#1890ff', paddingLeft: '60px'}}>{review.name}</h2>
                          </a>
                            <div style={{ display: "flex", marginBottom: "25px" }}>
                              <div className="col-md-2">
                                <div
                                  style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    {review.results.rating}.0
                                  </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                  <Rating
                                    name="read-only"
                                    value= {review.results.rating}
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
                                    <a href = "/companyHomes">
                                  {review.results.summary}</a>
                                </div>
                                <label style={{ color: "#767676" }}>
                                  {review.results.date}
                                </label>
                                <div style={{ marginTop: "10px" }}>
                                  {review.results.review}
                                </div>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    fontSize: "14px",
                                    marginTop: "15px",
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
                                  {review.results.pros}
                                </div>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    fontSize: "14px",
                                    marginTop: "15px",
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
                                  {review.results.cons}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: "flex" }}>
                              <div className="col-md-2"></div>
                              <a href="/companyHomes"><h3 style={{color: "#1890ff"}}> -> View on company page</h3></a>
                                
                            </div>
    
                            <hr></hr>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </>
        );
      };

  

  return (
//     <div className="main">  
//    <div className="head" style={{height: '100px'}}>
//        <h1  className= "heading">My reviews and contributions</h1>
//     </div>
//     <div className="cow">
//     <div className="reviewsheader">
//     <h2 className="title">
//         Company Reviews
//     </h2> 
//     <span className="des">Reviews appear on the employer's Company Page. They are never associated with your name, resume or job applications.</span>
//     </div> 
//     <div>{renderReviews()}</div>
//     </div>
//     </div>
   <div style={{display: 'flex', flexDirection: "column", justifyContent: "flex-start", marginLeft: '100px'}}>
       <h1 >My reviews and contributions</h1> 
       <h2 >Company Reviews</h2> 
       <h5> Reviews appear on the employer's Company Page. They are never associated with your name, resume or job applications.</h5>
       <div>{renderReviews()}</div>
   </div>
   
  );
}

export default MyReviews;
